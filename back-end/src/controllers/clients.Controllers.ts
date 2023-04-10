import { Request, Response } from "express";
import {
  CreateClientService,
  DeleteClientService,
  ListCientService,
  UpdateClientService,
} from "../services/clients.Services";
import { iClientRequest } from "../interfaces/users.interfaces";

export const CreateClientController = async (req: Request, res: Response) => {
  const Clientdata: iClientRequest = req.body;
  const ClientCreated = await CreateClientService(Clientdata);
  return res.status(201).json(ClientCreated);
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
