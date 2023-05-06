import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import { AnySchema, object } from "yup";
import "dotenv/config";
import Clients from "../entities/clients.entities";
import {
  iClientRequest,
  iClientResponse,
  iUserLogin,
  iUserRequest,
} from "../entities/interfaces/users.interfaces";

export const ensureAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Não autorizado", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (err, user: iClientResponse) => {
      if (err) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = user;

      return next();
    }
  );
};

export const ensureEmailMIddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: any = req.body;
  const findUser = AppDataSource.getRepository(Clients);
  const user = await findUser.exist({ where: { email: email } });
  if (user) {
    throw new AppError("Email arealdy exists!", 400);
  }

  return next();
};

export const ensureExistsUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: iUserLogin = req.body;

  if (!email || !password) {
    throw new AppError("Dados Inválidos", 404);
  }

  const userRespository = AppDataSource.getRepository(Clients);

  const foundUser = await userRespository.find({ where: { email: email } });

  if (foundUser.length < 1) {
    throw new AppError("User not found", 404);
  }

  return next();
};
