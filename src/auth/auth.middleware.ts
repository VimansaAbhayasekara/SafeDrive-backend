/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import authService from "./auth.service";
import { ITokenBody } from "./auth.interface";

const authorize = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized!" });
    }

    let tokenPayload: ITokenBody;

    try {
        tokenPayload = await jwt.verify(token, String(process.env.JWT_SECRET)) as ITokenBody;
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized!" });
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized!" });
    }

    const dbAuth = await authService.findById(tokenPayload._id);

    if (!dbAuth) {
        return res.status(StatusCodes.NOT_FOUND).json({ "message": "User not found!" });
    }

    req.auth = {
        _id: tokenPayload._id,
        auth: dbAuth
    };

    next();
}


export default { authorize }