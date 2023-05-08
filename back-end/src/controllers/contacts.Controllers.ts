import { Request, Response } from "express";
import {
  CreateContactService,
  DeletecontactService,
  ListContactervice,
  UpdatecontactService,
  getContactbyClient,
  getContactbyIdService,
} from "../services/contact.Services";
import { iContactRequest } from "../entities/interfaces/users.interfaces";

export const CreateContactController = async (req: Request, res: Response) => {
  const Contactdata: iContactRequest = req.body;
  const idClient = req.user.id;
  console.log(idClient);
  const ContactCreated = await CreateContactService(Contactdata, idClient);
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

export const getContactbyIdController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const contact = await getContactbyIdService(id);
  return res.status(200).json(contact);
};

export const getContactbyClienController = async (
  req: Request,
  res: Response
) => {
  const idContact: any = req.params.id;
  console.log(idContact);
  //const idClient: string = req.body;
  const contacts = await getContactbyClient(idContact);

  return res.status(200).json(contacts);
};

export const DeleteContactController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const ContacteDeleted = await DeletecontactService(id);
  return res.status(204).json(ContacteDeleted);
};
