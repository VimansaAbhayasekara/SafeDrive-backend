/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";
import CommonUtil from "./common/common.util";
import './express';
import AuthRoutes from "./auth/auth.route";
import VehicleRoutes from "./vehicle/vehicle.route";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({ message: "Hello World!" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/vehicle", VehicleRoutes);
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ message: "API Endpoint Not Found!"})
});

const onServerStart = async () => {
    try {
        // await CommonUtil.connectDb(process.env.MONGO_BASE_URL);
        await CommonUtil.connectDb("mongodb+srv://ammar:ammar123@vehicle.hsros5q.mongodb.net/SafeDrive");

        app.listen(process.env.SERVER_PORT || 4000, async() => {
            console.log(`Server is running on port ${process.env.SERVER_PORT || 4000}`);

            //handle notifications
            await CommonUtil.sendReminderNotifications();
        });

    } catch (error) {
        console.error(error);
    }
}

onServerStart();

