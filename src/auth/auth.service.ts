
/*
*   Copyright (c) 2024 Vimansa Abhayasekara
*   All rights reserved.
*/
import { ClientSession } from "mongoose";
import { IAuthModel } from "./auth.interface";
import Auth from "./auth.model";

const save = async (auth: IAuthModel, session?: ClientSession) => {
    return auth.save({ session });
};

const findById = async (_id: string, session?: ClientSession) => {
    if(session) return await Auth.findById(_id).session(session);
    return Auth.findById(_id).session(session);
};

const findByEmail = async (email: string, session?: ClientSession) => {
    if(session) return await Auth.findOne({ email }).session(session);
    return Auth.findOne({ email }).session(session);
};

export default {
    save,
    findById,
    findByEmail,
}