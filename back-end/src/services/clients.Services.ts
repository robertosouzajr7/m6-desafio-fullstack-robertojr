import AppDataSource from "../data-source";
import Clients from "../entities/clients.entities";
import {
  iClientRequest,
  iClientResponse,
} from "../interfaces/users.interfaces";
import { Request } from "express";
import { AppError } from "../errors";
import { clientResponseSerializer } from "../serializers/clients.Serializer";
import { Users } from "../entities/users.entities";

export const CreateClientService = async (req: iClientRequest) => {
  const cliente = req;
  const ClientInrepository = AppDataSource.getRepository(Clients);

  const client = new Clients();
  client.name = cliente.name;
  client.email = cliente.email;
  client.phone = cliente.phone;

  await ClientInrepository.save(client);
  const data = await clientResponseSerializer.validate(client, {
    stripUnknown: true,
  });
  return data;
};

export const UpdateClientService = async (req: Request, id: string) => {
  const client = req.body;
  const ClientInrepository = AppDataSource.getRepository(Clients);
  const findClient = ClientInrepository.findOneBy({
    id: id,
  });

  const updateClient = ClientInrepository.create({
    ...findClient,
    ...client,
  });
  await ClientInrepository.save(updateClient);
  return updateClient;
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
  await findClients.delete(client);
  return {};
};
