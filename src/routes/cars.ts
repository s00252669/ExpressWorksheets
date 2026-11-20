import { Router } from 'express'; 

import { CarController } from '../controllers/cars'; 
import { authenticateKey, authenticateJWT } from '../middleware/auth.middleware';

import { validate } from '../middleware/validate.middleware';
import { createCarZSchema, updateCarZSchema, carParamsSchema } from '../models/cars';
const router = Router(); 

const carController = new CarController(); 

 

router.get('/', carController.getCars); 

 

router.get('/:id', carController.getCarById);  

router.post('/', authenticateKey, validate(createCarZSchema), carController.createCar)
router.put('/:id', carController.updateCar); 

router.delete('/:id', authenticateJWT, validate(carParamsSchema), carController.deleteCar);
router.get('/:id', validate(carParamsSchema), carController.getCarById);
router.put('/:id', validate(carParamsSchema), validate(updateCarZSchema), carController.updateCar);
router.delete('/:id', validate(carParamsSchema), carController.deleteCar);
 

export default router;