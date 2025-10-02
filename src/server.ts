import { AppDataSource } from './orm/Config/Data-source';
import { app } from './index';

AppDataSource.initialize().then(() => {
  app.listen(8081, () => {
    console.log("Server running at http://localhost:8081");
  });
}).catch((error) => {
  console.error("Database connection failed:", error);
});
