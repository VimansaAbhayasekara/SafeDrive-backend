/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import FirebaseAdmin from "firebase-admin";
import serviceAccountCredentials from "./safedrive.json";

import { INotification } from "./notification.interface";

const serviceAccount = serviceAccountCredentials as any;

FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(serviceAccount),
});

const subscribeToTopic = async (registrationTokens: string[], topic: string) => {
    await FirebaseAdmin.messaging().subscribeToTopic(registrationTokens, topic);
};

const unsubscribeFromTopic = async (registrationTokens: string[], topic: string) => {
    await FirebaseAdmin.messaging().unsubscribeFromTopic(registrationTokens, topic);
};

const sendReminderNotification = async (topic: string, notificationPayload: INotification) => {
    const message = {
        topic: topic,
        notification: {
            title: notificationPayload.title,
            body: notificationPayload.body,
        },
        data: {
            title: notificationPayload.title,
            body: notificationPayload.body,
            description: notificationPayload.description,
        },
    };
    await FirebaseAdmin.messaging().send(message);
};

export default { 
    FirebaseAdmin, 
    subscribeToTopic,
    unsubscribeFromTopic,
    sendReminderNotification,
};
