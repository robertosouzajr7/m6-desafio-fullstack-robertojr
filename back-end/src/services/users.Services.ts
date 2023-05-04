/* import AppDataSource from "../data-source";
import {
  iUserRequest,
  iUserResponse,
  iUserLogin,
} from "../entities/interfaces/users.interfaces";
import { AppError } from "../errors";
import { userResponseSerializer } from "../serializers/users.Serializer";
import { compare } from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const CreateUserService = async (
  req: iUserRequest
): Promise<iUserResponse> => {
  const { name, email, password } = req;
  const usersInrepository = AppDataSource.getRepository(Users);
  const user = new Users();
  user.name = name;
  user.email = email;
  user.password = bcrypt.hashSync(password, 10);

  usersInrepository.create(user);
  await usersInrepository.save(user);
  const newUser = await userResponseSerializer.validate(user, {
    stripUnknown: true,
  });
  return newUser;
};

export const LoginUserService = async (req: iUserLogin): Promise<string> => {
  const usersInrepository = AppDataSource.getRepository(Users);
  const verifyEmail = await usersInrepository.findOneByOrFail({
    email: req.email,
  });

  if (!verifyEmail) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const chekPassword = await compare(req.password, verifyEmail.password);

  if (!chekPassword) {
    throw new AppError("Email ou senha Inválido", 403);
  }

  const token = jwt.sign(
    {
      email: verifyEmail.email,
    },
    process.env.SECRET_KEY as string,
    {
      subject: verifyEmail.id,
      expiresIn: "24h",
    }
  );
  return token;
};
 
 */
