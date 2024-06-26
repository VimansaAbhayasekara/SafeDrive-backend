/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import { Document } from "mongoose";

interface IAuth {
    name: string;
    email: string;
    password: string;
    role: string;
    mobile?: string;
    province: string;
    district: string;
    businessLicenseNumber?: string;
    fcmToken?: string;
}

interface ITokenBody {
    _id: string;
    email: string;
    role: string;
}

interface IAuthPayload {
    _id: string;
    auth: IAuthModel;
}

interface IAuthModel extends IAuth, Document { }

export {
    IAuth,
    IAuthModel,
    ITokenBody,
    IAuthPayload,
}