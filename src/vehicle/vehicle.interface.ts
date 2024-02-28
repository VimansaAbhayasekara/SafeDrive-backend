/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */

import { ObjectId, Document } from "mongoose"

interface IVehicle {
    auth: {
        _id: ObjectId;
    },
    category: string;
    description: string;
    installationDate: Date;
    renewalDate: Date;
    reminderSent: boolean;
}

interface IVehicleModel extends IVehicle, Document { }

export {
    IVehicle,
    IVehicleModel,
}