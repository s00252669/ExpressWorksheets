import { Request, Response } from 'express'; 
import { CarService } from '../services/cars';
const carService = new CarService();

export class CarController { 

  getCars = async (_req: Request, res: Response): Promise<void> => {
      const cars = await carService.getAllCars();
      res.status(200).json(cars);
  };

  getCarById = async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const car = await carService.getCarById(id);
      res.status(200).json(car);
  };

  createCar = async (req: Request, res: Response): Promise<void> => {
      const newCar = await carService.createCar(req.body);
      res.status(201).json(newCar);
  };

  updateCar = async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updatedCar = await carService.updateCar(id, req.body);
      res.status(200).json(updatedCar);
  };

  deleteCar = async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const deleted = await carService.deleteCar(id);
      res.status(200).json({ message: 'Car deleted', car: deleted });
  };
}