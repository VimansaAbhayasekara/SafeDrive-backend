/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import mongoose, { ClientSession } from "mongoose";
import { IVehicleModel } from "./vehicle.interface";
import Vehicle from "./vehicle.model";

const save = async(vehicleDetail: IVehicleModel, session?: ClientSession) => {
    return await vehicleDetail.save({ session });
};

const findById = async(_id: string, session?: ClientSession) => {
    if(session) return await Vehicle.findById(_id).session(session);
    return Vehicle.findById(_id).session(session);
};

const deleteById = async(_id: string, session?: ClientSession) => {
    if(session) return await Vehicle.findByIdAndDelete(_id).session(session);
    return Vehicle.findByIdAndDelete(_id).session(session);
};

const findByCategory = async(category: string, authId: string, session?: ClientSession) => {
    if(session) return await Vehicle.find({ category: category, auth: { _id: authId } }).session(session);
    return Vehicle.find({ category: category, auth: { _id: authId } }).session(session);
};

const getAll = async() => {
    return await Vehicle.find();
};

export default {
    save,
    findById,
    deleteById,
    findByCategory,
    getAll,
}