import AppDataSource from "../data-source";
import { Contacts } from "../entities/contacts.entities";
import {
  iContactRequest,
  iContactResponse,
} from "../interfaces/users.interfaces";
import { Request } from "express";
import { AppError } from "../errors";
import { contactResponseSerializer } from "../serializers/contacts.Serializer";

export const CreateContactService = async (
  req: iContactRequest
): Promise<iContactResponse> => {
  const { email, name, phone } = req;
  const ContactRepository = AppDataSource.getRepository(Contacts);
  const contact = new Contacts();
  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  await ContactRepository.save(contact);
  const newContact = await contactResponseSerializer.validate(contact, {
    stripUnknown: true,
  });
  return newContact;
};

export const UpdatecontactService = async (req: Request, id: string) => {
  const contact = req.body;
  const contactInrepository = AppDataSource.getRepository(contact);
  const findcontact = contactInrepository.findOneBy({
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
  await findcontacts.delete(contact);
  return {};
};
