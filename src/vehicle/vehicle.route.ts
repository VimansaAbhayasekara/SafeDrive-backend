/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import express from 'express';
import VehicleController from './vehicle.controller';
import AuthMiddleware from '../auth/auth.middleware';

const router = express.Router();

router.post('/', AuthMiddleware.authorize, VehicleController.create);

router.put('/:vehicleDetailId', AuthMiddleware.authorize, VehicleController.edit);

router.delete('/:vehicleDetailId', AuthMiddleware.authorize, VehicleController.remove);

router.get('/:category', AuthMiddleware.authorize, VehicleController.getByCategory);

export default router;