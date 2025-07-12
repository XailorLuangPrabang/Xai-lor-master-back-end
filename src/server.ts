import express, { Request, Response } from "express";
import basicApiRoute from "./modules/basicApi/route";
import { AppDataSource } from "./database/dbComponents";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", basicApiRoute);

AppDataSource.initialize()
  .then(() => {
    console.log("connect database successful");
    app
      .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      })
      .on("error", (err: any) => {
        console.error("Failed to start server:", err);
      });
  })
  .catch((error: any) => {
    console.log("Error while connecting database", error);
  });
