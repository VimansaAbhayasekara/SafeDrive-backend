/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import mongoose from "mongoose";
import cron from "node-cron";
import VehicleService from "../vehicle/vehicle.service";
import moment from "moment";
import firebaseConfig from "./firebase.config";
import { INotification } from "./notification.interface";

const connectDb = async (url: string) => {
    return mongoose
        .connect(url, { retryWrites: true, w: "majority" })
        .then(() => {
            console.log("MONGO DB CONNECTION SUCCESSFUL!");
        })
        .catch((err) => {
            console.error(err);
        });
};

const sendReminderNotifications = async () => {
    cron.schedule(
        "* * * * *",
        async () => {
            console.log('Reminder Notification job started');

            const dbVehicleDetails = await VehicleService.getAll();

            for (const dbVehicleData of dbVehicleDetails) {
                if (!dbVehicleData.installationDate || !dbVehicleData.renewalDate) return;
                const renewalDate = moment(dbVehicleData.renewalDate).subtract(1, 'month').format();
                const currentDate = moment().format();
        
                if ((currentDate > renewalDate) && !dbVehicleData.reminderSent) {
                    const dbData = await VehicleService.findById(dbVehicleData._id);
                    dbData.reminderSent = true;
                    await VehicleService.save(dbData);

                    const payload: INotification = {
                        title: "Attention !",
                        body: `You have to upcoming renewal of ${dbVehicleData.description} in 30 days`,
                        description: `You have to upcoming renewal of ${dbVehicleData.description} in 30 days`
                    };
                    await firebaseConfig.sendReminderNotification(dbVehicleData.auth._id.toString(),payload);
                    console.log(`Notifying renewal date - ${dbVehicleData._id}`);
                } 
            }
        }
    );
};

export default { 
    connectDb, 
    sendReminderNotifications,
}