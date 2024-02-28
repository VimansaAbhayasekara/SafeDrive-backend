/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { IAuthPayload } from "./auth/auth.interface";

declare module 'express-serve-static-core' {
    interface Request {
        auth: IAuthPayload;
    }
}