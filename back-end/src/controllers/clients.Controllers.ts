import { Request, Response } from "express";
import {
  CreateClientService,
  DeleteClientService,
  ListCientService,
  LoginClientService,
  UpdateClientService,
  getClientbyIdService,
} from "../services/clients.Services";
import {
  iClientRequest,
  iUserLogin,
} from "../entities/interfaces/users.interfaces";
import { clientRequestSerializer } from "../serializers/clients.Serializer";
import { AppError } from "../errors";

export const CreateClientController = async (req: Request, res: Response) => {
  try {
    const data = await clientRequestSerializer.validate(req.body);
    const Clientdata: iClientRequest = data;

    const ClientCreated = await CreateClientService(Clientdata);
    return res.status(201).json(ClientCreated);
  } catch (error) {
    throw new AppError(error.message);
  }
};

export const ListClientController = async (req: Request, res: Response) => {
  const ClientCreated = await ListCientService();
  return res.status(200).json(ClientCreated);
};

export const UpdateClientController = async (req: Request, res: Response) => {
  const Clientdata: any = req.body;
  const id: string = req.params.id;
  const ClientCreated = await UpdateClientService(Clientdata, id);
  return res.status(200).json(ClientCreated);
};

export const DeleteClientController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const clienteDeleted = await DeleteClientService(id);
  return res.status(204).json(clienteDeleted);
};

export const getClientbyIdControllers = async (req: Request, res: Response) => {
  const idClient: string = req.params.id;
  const data = await getClientbyIdService(idClient);
  return res.status(200).json(data);
};

export const LoginClientController = async (req: Request, res: Response) => {
  const data: iUserLogin = req.body;
  const response = await LoginClientService(data);

  return res.status(201).json(response);
};
