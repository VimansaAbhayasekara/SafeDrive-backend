/*
*   Copyright (c) 2024 Vimansa Abhayasekara
*   All rights reserved.
*/
import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

export default router;