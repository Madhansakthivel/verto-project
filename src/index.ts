import express from 'express';
import { AppDataSource } from './orm/Config/Data-source';
import apiRouter from "./Routes";  


AppDataSource.initialize().then(() => {
   const app = express();
   app.use(express.json())
   

   app.use("/api", apiRouter);

  app.listen(8081, () => {
  console.log("Server running at http://localhost:8081");
});
})