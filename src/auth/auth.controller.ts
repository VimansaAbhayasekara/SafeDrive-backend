/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import { Request, Response } from "express";
import AuthService from "./auth.service";
import { StatusCodes } from "http-status-codes";
import Auth from "./auth.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ITokenBody } from './auth.interface';
import commonUtil from "../common/common.util";
import firebaseConfig from "../common/firebase.config";

const login = async (req: Request, res: Response) => {

    const { email, password, message_token } = req.body;

    const dbAuth = await AuthService.findByEmail(email);

    if (!dbAuth) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "User account does not exist!" });
    }

    const passwordCompare = await bcrypt.compare(password, dbAuth.password);

    if (!passwordCompare) {
       return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Bad Credentials!" });
    }

    //update fcm token
    if(message_token) {
        dbAuth.fcmToken = message_token;
        await AuthService.save(dbAuth);
        await firebaseConfig.subscribeToTopic([dbAuth.fcmToken], dbAuth._id.toString());
    }

    const tokenBody: ITokenBody = {
        _id: dbAuth._id,
        email: dbAuth.email,
        role: dbAuth.role,
    };

    const token = jwt.sign(tokenBody, String(process.env.JWT_SECRET), { expiresIn: 24 * 60 * 60 });

    return res.status(StatusCodes.OK).json({ 
        message: "Login Successful!",
        payload: {
            token: token,
            user: dbAuth,
        }
     });
};

const register = async (req: Request, res: Response) => {

    const dbAuth = await AuthService.findByEmail(req.body.email);

    if (dbAuth) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const auth = new Auth({
        ...req.body,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
    });

    await AuthService.save(auth);

    return res.status(StatusCodes.CREATED).json({
        message: "User created successfully!",
        payload: auth,
    });
};

export default { login, register };