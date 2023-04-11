import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import AppDataSource from "../data-source";
import { Users } from "../entities/users.entities";
import jwt from "jsonwebtoken";
import { AnySchema, object } from "yup";
import "dotenv/config";
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

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = {
      id: decoded.sub,
      isUser: decoded.isUser,
    };

    return next();
  });
};

export const ensureEmailMIddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email }: any = req.body;
  const findUser = AppDataSource.getRepository(Users);
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
  const userId = req.params.id;

  if (!userId) {
    throw new AppError("Invalid id", 404);
  }

  const userRespository = AppDataSource.getRepository(Users);

  const foundUser = await userRespository.find({ where: { id: userId } });

  if (foundUser.length < 1) {
    throw new AppError("User not found", 404);
  }

  return next();
};
