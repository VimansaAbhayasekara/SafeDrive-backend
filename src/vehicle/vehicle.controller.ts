/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */

import { Request, Response } from "express";
import Vehicle from "./vehicle.model";
import VehicleService from "./vehicle.service";
import { StatusCodes } from "http-status-codes";
import { IAuthPayload } from "../auth/auth.interface";

const create = async (req: Request, res: Response) => {
    const auth = req.auth as IAuthPayload;

    const vehicleDetails = new Vehicle({
        auth: {
            _id: auth.auth._id
        },
        ...req.body
    });

    await VehicleService.save(vehicleDetails);

    return res.status(StatusCodes.CREATED).json({
        message: "Vehicle details created successfully!",
        payload: vehicleDetails,
    });
};

const edit = async (req: Request, res: Response) => {

    const { vehicleDetailId } = req.params;
    const { description, installationDate, renewalDate } = req.body;

    const dbVehicleDetails = await VehicleService.findById(vehicleDetailId);

    if (!dbVehicleDetails) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Vehicle details not found!"
        });
    }

    dbVehicleDetails.description = description;
    dbVehicleDetails.installationDate = installationDate;
    dbVehicleDetails.renewalDate = renewalDate;

    await VehicleService.save(dbVehicleDetails);

    return res.status(StatusCodes.OK).json({
        message: "Vehicle details updated successfully!",
        payload: dbVehicleDetails,
    });
};

const remove = async (req: Request, res: Response) => {
    const { vehicleDetailId } = req.params;

    const dbVehicleDetails = await VehicleService.findById(vehicleDetailId);

    if (!dbVehicleDetails) {
        return res.status(StatusCodes.NOT_FOUND).json({
            message: "Vehicle details not found!"
        });
    }

    await VehicleService.deleteById(dbVehicleDetails._id);

    return res.status(StatusCodes.OK).json({
        message: "Vehicle details deleted successfully!",
    });
};

const getByCategory = async (req: Request, res: Response) => {
    const { category } = req.params;
    const auth = req.auth as IAuthPayload;
    const dbVehicleDetails = await VehicleService.findByCategory(category, auth.auth._id);

    return res.status(StatusCodes.OK).json({
        message: "Vehicle details fetched successfully!",
        payload: dbVehicleDetails,
    });
};

export default { create, edit, remove, getByCategory };
