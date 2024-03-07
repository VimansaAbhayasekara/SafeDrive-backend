/*
 *   Copyright (c) 2024 Vimansa Abhayasekara
 *   All rights reserved.
 */
import { IAuthPayload } from "./auth/auth.interface";

declare module 'express-serve-static-core' {
    interface Request {
        auth: IAuthPayload;
    }
}