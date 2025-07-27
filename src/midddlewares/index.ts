import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { handleErrorOneResponse } from "../utils/inext";
import { User } from "../modules/user/user.entity";

export const asccessAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(400).json(
        handleErrorOneResponse({
          code: "UNAUTHENTICATE",
          message: "Unauthencata",
          error: {},
        })
      );
      return;
    }
    const decodeData = jwt.verify(token, "abc") as User;
    const userId = String(decodeData?.id);
    if (!req.body) req.body = {};
    req.body.userId = userId;
    next();
  } catch (error: any) {
    res.status(500).json(
      handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
        error: error,
      })
    );
  }
};