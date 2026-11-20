import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env";
 import carRoutes from './routes/cars'; 
 import { connectDB } from './config/database';
 import { errorHandler } from './middleware/error.middleware';
const port = env.port

import { authenticateKey } from './middleware/auth.middleware';
 import { logger } from './middleware/logger.middleware';
import cors from 'cors';

const app: Application = express(); 
export { app };
app.use(express.json());
app.use(logger);
app.use(cors());

 app.use('/api/v1/cars', carRoutes); 
 app.use(errorHandler);

app.get("/ping", async (_req : Request, res: Response) => { 

app.get("/pong", (_req : Request, _res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req : Request, _res: Response) => {
    console.log("Received request to /pung");
     throw new Error("Simulated error in /pung route");
});
res.json({ 

 message: "hello from Ben "

 }); 

}); 
app.use(authenticateKey);
 app.get('/nuts', async (_req : Request, res: Response) => { 

res.json({ 

 message: "this is nuts", 

 }); 

}); 


 
 