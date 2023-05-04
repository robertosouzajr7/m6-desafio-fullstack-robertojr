import AppDataSource from "../data-source";
import { Contacts } from "../entities/contacts.entities";
import {
  iContactRequest,
  iContactResponse,
} from "../entities/interfaces/users.interfaces";
import { Request } from "express";
import { AppError } from "../errors";
import { contactResponseSerializer } from "../serializers/contacts.Serializer";
import Clients from "../entities/clients.entities";
import { Repository } from "typeorm";

export const CreateContactService = async (
  req: iContactRequest
): Promise<iContactResponse> => {
  const { client_id } = req;
  const ContactRepository: Repository<Contacts> =
    AppDataSource.getRepository(Contacts);
  const ClientsRepository: Repository<Clients> =
    AppDataSource.getRepository(Clients);

  const Client = await ClientsRepository.findOneBy({ id: client_id });
  console.log(Client, client_id);
  const contact = ContactRepository.create({
    email: req.email,
    name: req.name,
    phone: req.phone,
    clients: Client!,
  });

  await ContactRepository.save(contact);
  const newContact = await contactResponseSerializer.validate(contact, {
    stripUnknown: true,
  });
  return newContact;
};

export const getContactbyIdService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contacts);
  const contact = await contactRepository.findOneBy({ id: id });
  console.log(contact);
  return contact;
};

export const getContactbyClient = async (
  idClient: string
  //idContact: string
) => {
  const contactRepository = AppDataSource.getRepository(Contacts);
  const clientRpository = AppDataSource.getRepository(Clients);

  const client: Clients | null = await clientRpository.findOne({
    where: {
      id: idClient,
    },
    relations: {
      contact: true,
    },
  });

  console.log(client);

  return client;
};

export const UpdatecontactService = async (
  req: iContactRequest,
  id: string
) => {
  const contact = req;
  const contactInrepository = AppDataSource.getRepository(Contacts);
  const findcontact = await contactInrepository.findOneBy({
    id: id,
  });

  if (!findcontact) {
    throw new AppError("Usuário não encontrado", 404);
  }
  const updatecontact = contactInrepository.create({
    ...findcontact,
    ...contact,
  });
  await contactInrepository.save(updatecontact);
  return updatecontact;
};

export const ListContactervice = async (): Promise<iContactResponse[]> => {
  const findcontacts = AppDataSource.getRepository(Contacts);
  const contacts = await findcontacts.find();

  const listcontacts = await Promise.all(
    contacts.map(async (contact) => {
      const allcontacts = await contactResponseSerializer.validate(contact, {
        stripUnknown: true,
      });
      return allcontacts;
    })
  );

  return listcontacts;
};

export const DeletecontactService = async (id: string) => {
  const findcontacts = AppDataSource.getRepository(Contacts);

  const contact = await findcontacts.findOneBy({
    id: id,
  });

  if (!contact) {
    throw new AppError("contacte não encontrado", 404);
  }
  await findcontacts.delete(id);
  return {};
};
