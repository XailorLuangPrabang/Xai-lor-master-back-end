import { Request } from "express";
import { AppDataSource } from "../../../database/dbComponents";
import { IOneResponse } from "../../../types/base";
import {
  handleErrorOneResponse,
  handleSuccessOneRepones,
} from "../../../utils/inext";
import { User } from "../user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class MutationServices {
  static userRepository = AppDataSource.getRepository(User);
  static async updateUser(id: string, data: User): Promise<IOneResponse> {
    try {
      const userId = Number(id);
      if (!userId) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "ID must be a number",
          error: {},
        });
      }
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Data not found",
          error: {},
        });
      }

      if (!data.name || !data.email) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Name and email are required",
          error: {},
        });
      }
      const existEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (existEmail && existEmail.id !== userId) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Email already exists",
          error: {},
        });
      }
      if (data.password) {
        //Has password
        const hashPW =  bcrypt.hashSync(data.password, 10);
        data.password = hashPW;
      }
      const userChange = this.userRepository.merge(user, data);
      const userUpdate = await this.userRepository.save(userChange);
      return handleSuccessOneRepones({
        code: "SUCCESS",
        message: "Update data success",
        data: userUpdate,
      });
    } catch (error: any) {
      return handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      });
    }
  }
  static async createUser(data: User): Promise<IOneResponse> {
    try {
      if (!data.name) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Fullname is required",
          error: {},
        });
      }
      if (!data.email) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Email is required",
          error: {},
        });
      }
      if (!data.password) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "password is required",
          error: {},
        });
      }

      //Has password
      const hashPW = bcrypt.hashSync(data.password, 10);
      data.password = hashPW;

      const existEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (existEmail) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Email already exists",
          error: {},
        });
      }
      const createUser = await this.userRepository.save(data);
      return handleSuccessOneRepones({
        code: "SUCCESS",
        message: "Create user success",
        data: { ...createUser, password: null },
      });
    } catch (error: any) {
      return handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      });
    }
  }
  static async deleteUser(id: string): Promise<IOneResponse> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "ID must be a number",
          error: {},
        });
      }
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        return handleErrorOneResponse({
          code: "BAD_REQUEST",
          message: "Data not found",
          error: {},
        });
      }
      await this.userRepository.delete(userId);
      return handleSuccessOneRepones({
        code: "SUCCESS",
        message: "Delete data success",
        data: {},
      });
    } catch (error: any) {
      return handleErrorOneResponse({
        code: "INTERNAL_SERVER_ERROR",
        error: error,
        message: error.message,
      });
    }
  }

  static async userLogin(
    email: string,
    password: string
  ): Promise<IOneResponse> {
    try {
      //1. validate data input
      if (!email || !password) {
        return handleErrorOneResponse({
          code: "Bad_Request",
          message: "Email or password must required",
          error: {},
        });
      }

      //2. Find email already in system
      const existEmail = await this.userRepository.findOneBy({ email });
      if (!existEmail) {
        return handleErrorOneResponse({
          code: "BAD_RERUEST",
          message: "Email or password incorrect",
          error: {},
        });
      }

      //3. compare password
      const comparePassword = await bcrypt.compare(
        password,
        existEmail.password
      );
      if (!comparePassword) {
        return handleErrorOneResponse({
          code: "BAD_RERUEST",
          message: "Email or password incorrect",
          error: {},
        });
      }
      //4. Generate token(Key)
      const payload = {
        id: existEmail.id,
        name: existEmail.name,
      };
      const token = jwt.sign(payload, "abc", { expiresIn: "1h" });

      //5. return data to client
      return handleSuccessOneRepones({
        code: "SUCCESS",
        data: {
          user: { ...existEmail, password: null },
          token,
        },
        message: "Login success",
      });
    } catch (error: any) {
      error = null;
      return handleErrorOneResponse({
        code: "INTERNAL_ SERVER_ERROR",
        message: error?.message,
        error,
      });
    }
  }
}
