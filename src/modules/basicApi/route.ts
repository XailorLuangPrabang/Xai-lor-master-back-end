import express, { Request, Response } from "express";
import { handleSuccessOneRepones } from "../../utils/inext";

const basicApiRoute = express();

basicApiRoute.get("/api", (req: Request, res: Response) => {
  console.log("Received a request at /");
  //don't understand
  res.status(200).json(
    handleSuccessOneRepones({
      code: "SUCCESS_ONE_RESPONE",
      message: "GOOD_JOB_FOR_SUCCESS_ONE_RESPONE",
      data: {},
    })
  );
});

let userDatas: any[] = [];

basicApiRoute.post("/users", (req: Request, res: Response) => {
  const user = req.body;
  userDatas.push(user);
  res.send({ message: "User created successfully", user });
});

basicApiRoute.put("/users/:id", (req: Request, res: any) => {
  //I don't understand=>Any
  const userId = req.params.id;
  const updatedUser = req.body;
  const userIndex = userDatas.findIndex((user) => user.id == userId);
  if (userIndex === -1) {
    //i don't understandb
    return res.status(404).json({ message: "User not found" });
  }
  userDatas[userIndex] = updatedUser;
  return res
    .status(200)
    .json({ message: "User updated successfully", user: updatedUser });
});

export default basicApiRoute;
