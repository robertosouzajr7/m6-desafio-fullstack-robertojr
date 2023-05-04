import AppDataSource from "../data-source";
import Clients from "../entities/clients.entities";
import {
  iClientRequest,
  iClientResponse,
  iUserLogin,
} from "../entities/interfaces/users.interfaces";
import { Request } from "express";
import { AppError } from "../errors";
import { clientResponseSerializer } from "../serializers/clients.Serializer";
import { compare } from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const CreateClientService = async (req: iClientRequest) => {
  const cliente = req;
  const ClientInrepository = AppDataSource.getRepository(Clients);

  const client = new Clients();
  client.name = cliente.name;
  client.email = cliente.email;
  client.phone = cliente.phone;
  client.password = bcrypt.hashSync(cliente.password, 10);

  await ClientInrepository.save(client);
  const data = await clientResponseSerializer.validate(client, {
    stripUnknown: true,
  });
  return data;
};

export const LoginClientService = async (req: iUserLogin): Promise<string> => {
  const getClientRepository = AppDataSource.getRepository(Clients);

  const client = await getClientRepository.findOneByOrFail({
    email: req.email,
  });

  if (!client) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const verifyPassword = await compare(req.password, client.password);

  if (!verifyPassword) {
    throw new AppError("email ou senha inválido!", 403);
  }

  const token = jwt.sign(
    {
      email: client,
    },
    process.env.SECRET_KEY as string,
    {
      subject: client.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export const UpdateClientService = async (req: iClientRequest, id: string) => {
  const ClientInrepository = AppDataSource.getRepository(Clients);
  const findClient = await ClientInrepository.findOneBy({
    id: id,
  });
  const updateClient = ClientInrepository.create({
    ...findClient,
    ...req,
  });

  const newdata = await ClientInrepository.save(updateClient);

  const data = await clientResponseSerializer.validate(newdata, {
    stripUnknown: true,
  });
  return data;
};

export const ListCientService = async (): Promise<iClientResponse[]> => {
  const findClients = AppDataSource.getRepository(Clients);
  const clients = await findClients.find();

  const listClients = await Promise.all(
    clients.map(async (client) => {
      const allClients = await clientResponseSerializer.validate(client, {
        stripUnknown: true,
      });
      return allClients;
    })
  );

  return listClients;
};

export const DeleteClientService = async (id: string) => {
  const findClients = AppDataSource.getRepository(Clients);

  const client = await findClients.findOneBy({
    id: id,
  });

  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }
  await findClients.delete(id);
  return {};
};

export const getClientbyIdService = async (id: string) => {
  const foundClient = AppDataSource.getRepository(Clients);
  const client = await foundClient.findOneBy({ id: id });
  console.log(client);

  return client;
};
