import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Api from "../services/api";
import { toast } from "react-hot-toast";

export interface iContactRequest {
  name: string;
  phone: string;
  email: string;
  client_id: string;
}

export interface iClientResponse {
  contact: {
    name: string;
    email: string;
    phone: string;
    created_at: string;
    id: string;
  };
}
export interface iContactResponse {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
  contact: iClientResponse[];
}

interface iContactContext {
  setContact: React.Dispatch<React.SetStateAction<iContactResponse>>;
  CreateContact: (data: iContactRequest) => void;
  contact: iContactResponse;
  listContact: [];
  setListContact: React.Dispatch<React.SetStateAction<[]>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  GetAllContacts: () => void;
  GetContactsByClientId: () => void;
  UpdateContacts: (data: iContactRequest, id: string) => void;
  GetContactById: (id: string) => void;
}

interface iChildren {
  children: ReactNode;
}

export const ContactContext = createContext<iContactContext>(
  {} as iContactContext
);

function ContactProvider({ children }: iChildren) {
  const [contact, setContact] = useState<iContactResponse>(
    {} as iContactResponse
  );
  const [listContact, setListContact] = useState<[]>([]);
  const [edit, setEdit] = useState(false);

  const CreateContact = async (data: iContactRequest) => {
    await Api.post(`/contacts/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        setContact(res.data);
        toast.success("Contato criado com sucesso!");
      })
      .catch((error) => console.log(error));
  };

  const GetAllContacts = async () => {
    try {
      const contacts = await Api.get(`/contacts/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListContact(contacts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactsByClientId = async () => {
    try {
      const contacts = await Api.get(
        `/contacts/clients/${localStorage.getItem("idClient")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setContact(contacts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactById = async (id: string) => {
    try {
      const contact = await Api.get(`/contacts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setContact(contact.data);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContacts = async (data: iContactRequest, id: string) => {
    try {
      const contacts = await Api.patch(`/contacts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListContact(contacts.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contact,
        setContact,
        CreateContact,
        listContact,
        edit,
        setEdit,
        setListContact,
        GetAllContacts,
        GetContactsByClientId,
        UpdateContacts,
        GetContactById,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
