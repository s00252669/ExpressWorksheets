import express, {Application, Request, Response} from "express" ; 
import { env } from "./config/env";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
 import carRoutes from './routes/cars'; 
     import { connectDB } from './config/database';
const port = env.port


 import { logger } from './middleware/logger.middleware';

const app: Application = express(); 
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use(express.json());
app.use(logger);

 app.use('/api/v1/cars', carRoutes); 

app.get("/ping", async (_req : Request, res: Response) => { 

res.json({ 

 message: "hello from Ben "

 }); 

}); 

 app.get('/nuts', async (_req : Request, res: Response) => { 

res.json({ 

 message: "this is nuts", 

 }); 

}); 

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();

 
 