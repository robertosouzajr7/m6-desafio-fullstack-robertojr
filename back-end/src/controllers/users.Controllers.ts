/* import { Request, Response } from "express";
import {
  CreateUserService,
  LoginUserService,
} from "../services/users.Services";
import {
  iUserRequest,
  iUserLogin,
} from "../entities/interfaces/users.interfaces";

export const CreateUserController = async (req: Request, res: Response) => {
  const userdata: iUserRequest = req.body;
  const userCreated = await CreateUserService(userdata);
  return res.status(201).json(userCreated);
};

export const LoginUserController = async (req: Request, res: Response) => {
  const userdata: iUserLogin = req.body;
  const userCreated = await LoginUserService(userdata);
  return res.status(201).json(userCreated);
};
 */
