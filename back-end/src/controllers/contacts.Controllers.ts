import { Request, Response } from "express";
import {
  CreateContactService,
  DeletecontactService,
  ListContactervice,
  UpdatecontactService,
} from "../services/contact.Services";
import { iContactRequest } from "../interfaces/users.interfaces";

export const CreateContactController = async (req: Request, res: Response) => {
  const Contactdata: iContactRequest = req.body;
  const ContactCreated = await CreateContactService(Contactdata);
  return res.status(201).json(ContactCreated);
};

export const ListContactController = async (req: Request, res: Response) => {
  const ContactCreated = await ListContactervice();
  return res.status(200).json(ContactCreated);
};

export const UpdateContactController = async (req: Request, res: Response) => {
  const Contactdata: any = req.body;
  const id: string = req.params.id;
  const ContactCreated = await UpdatecontactService(Contactdata, id);
  return res.status(200).json(ContactCreated);
};

export const DeleteContactController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const ContacteDeleted = await DeletecontactService(id);
  return res.status(204).json(ContacteDeleted);
};