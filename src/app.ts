import express, {Application, Request, Response} from "express" ; 

 

const PORT = process.env.PORT || 3000; 

 

const app: Application = express(); 

 

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

app.listen(PORT, () => { 

 console.log("Server is running on port", PORT); 

}); 

 app.use((req, _res, next) => { 

console.log(`${req.method} ${req.originalUrl}`); 

next(); 

}); 