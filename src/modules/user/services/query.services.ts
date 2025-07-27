import { Request } from "express";
import { AppDataSource } from "../../../database/dbComponents";
import { IManyResponse, IOneResponse } from "../../../types/base";
import {
  handleErrorManyResponse,
  handleErrorOneResponse,
  handleSuccessManyResponse,
  handleSuccessOneRepones,
} from "../../../utils/inext";
import { User } from "../user.entity";


export class QueryServices {
  static userRepository = AppDataSource.getRepository(User);
  static async findManyUser(): Promise<IManyResponse> {
    try {
      //count total user data
      const totalUser = await this.userRepository.count({}); //async and await ຖ້າເຮັດວຽກແລ້ວກ່ອນຈຶ່ງໄປ
      //get users data
      const users = await this.userRepository.find({});

      return handleSuccessManyResponse({
        code: "SUCCESS",
        message: "Fetch user data success",
        total: totalUser,
        data: users.map((user)=>{
          return {...user,password: null};
        }),
      });
    } catch (error: any) {
      return handleErrorManyResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      });
    }
  }

  static async findOne(id: string): Promise<IOneResponse> {
    try {
      //Get user id client using query
      const userId = Number(id);
      //check user id requery
      if (!userId) {
        return handleErrorOneResponse({
          code: "DAB_REQUEST",
          message: "Use id must required",
          error: {},
        });
      }

      //Get user data by id
      const user = await this.userRepository.findOneBy({ id: userId });
      //if user data found or null then return waring
      if (!user) {
        return handleErrorOneResponse({
          code: " BAD_REQUEST",
          message: "User not found",
          error: {},
        });
      }
      return handleSuccessOneRepones({
        code: "SUCCESS",
        message: "Fetch user data success",
        data: {...user,password: null},
      });
    } catch (error: any) {
      return handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      });
    }
  }
}
