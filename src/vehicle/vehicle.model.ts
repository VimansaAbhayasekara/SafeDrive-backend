/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { Schema } from "mongoose";
import { IVehicleModel } from "./vehicle.interface";
import constants from "../constants";

const VehicleSchema: Schema<IVehicleModel> = new mongoose.Schema({
    auth: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: constants.MODELS.AUTH,
            required: [true, "Auth Id is required"]
        }
    },
    category: {
        type: String,
        enum: {
            values: [
                constants.VEHICLE.CATEGORIES.DOCUMENTS,
                constants.VEHICLE.CATEGORIES.SPARE_PARTS,
                constants.VEHICLE.CATEGORIES.SERVICE_RECORDS,
            ],
            message: "Provide a valid category"
        },
        required: [true, "Category is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    installationDate: {
        type: Date,
        required: [true, "Installation Date is required"]
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal Date is required"]
    },
    reminderSent: {
        type: Boolean,
        default: false
    }
}, { versionKey: false, timestamps: true });

export default mongoose.model<IVehicleModel>(constants.MODELS.VEHICLE, VehicleSchema);