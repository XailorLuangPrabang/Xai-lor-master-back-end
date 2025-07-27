import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import {
  handleErrorManyResponse,
  handleErrorOneResponse,
} from "../../utils/inext";
import { QueryServices } from "./services/query.services";
import { MutationServices } from "./services/multation.services";
import { User } from "./user.entity";
import { asccessAuthenticate } from "../../midddlewares";
import { AppDataSource } from "../../database/dbComponents";

const userRoute = express();
//all User
userRoute.get("/get-many", async (req: Request, res: Response) => {
  try {
    const result = await QueryServices.findManyUser();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorManyResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      })
    );
  }
});
//Create User
userRoute.post("/create", async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;
    const result = await MutationServices.createUser(data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        error: error,
      })
    );
  }
});
//push User one
userRoute.get("/one/:userId", async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await QueryServices.findOne(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        error: error,
      })
    );
  }
});
//UpdateUser one
userRoute.put("/update/:userId", async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const data = req.body;
    const result = await MutationServices.updateUser(id, data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        error: error,
      })
    );
  }
});
//delete User one
userRoute.delete("/delete/:userId", async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await MutationServices.deleteUser(id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      })
    );
  }
});
//route user login
userRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await MutationServices.userLogin(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      })
    );
  }
});
//User Route register
userRoute.post("/register", async (req: Request, res: Response) => {
  try {
    const id = req.params.userId; //2?394w=89 Params and Reury
    const data = req.body;
    const result = await MutationServices.createUser(data);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        error: error,
      })
    );
  }
});

userRoute.get(
  "/profile",
  asccessAuthenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = req.body.userId;
      const result = await QueryServices.findOne(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json(
        handleErrorOneResponse({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          error: error,
        })
      );
    }
  }
);

//update Profile
userRoute.put(
  "/profile/update",
  asccessAuthenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = String(req.body.userId);
      const data = {} as User;
      data.name = req.body.name;
      data.email = req.body.email;
      data.password = req.body.password;

      const result = await MutationServices.updateUser(userId, data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json(
        handleErrorOneResponse({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          error: error,
        })
      );
    }
  }
);

export default userRoute;
