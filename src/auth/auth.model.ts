/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import constants from "../constants";
import { IAuthModel } from "./auth.interface";
import mongoose, { Schema } from "mongoose";

const AuthSchema: Schema<IAuthModel> = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: (value: any) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                );
            },
            message: (props: any) => `Email is invalid`,
        },
        required: [true, "E-mail is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: {
            values: [
                constants.ROLES.VEHICLE_OWNER,
                constants.ROLES.SUPPLIER,
                constants.ROLES.SERVICE_CENTER,
            ],
            message: "Provide a valid role"
        },
        required: [true, "Role is required"],
    },
    mobile: {
        type: String,
        required: [
            function (this: IAuthModel) {
                return this.role === constants.ROLES.SUPPLIER || this.role === constants.ROLES.SERVICE_CENTER;
            },
            "Mobile number is required"
        ],
    },
    province: {
        type: String,
        required: [true, "Province is required"],
    },
    district: {
        type: String,
        required: [true, "District is required"],
    },
    businessLicenseNumber: {
        type: String,
        required: [
            function (this: IAuthModel) {
                return this.role === constants.ROLES.SUPPLIER || this.role === constants.ROLES.SERVICE_CENTER;
            },
            "Business license number is required"
        ],
    },
    fcmToken: {
        type: String,
        required: false
    }
}, { versionKey: false, timestamps: true });

export default mongoose.model<IAuthModel>(constants.MODELS.AUTH, AuthSchema);