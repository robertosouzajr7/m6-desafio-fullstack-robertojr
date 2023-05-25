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
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
}
export interface iContactResponse {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
  contact: iClientResponse[] | undefined;
}

interface iContactContext {
  SetlistContact: React.Dispatch<React.SetStateAction<iContactResponse>>;
  listContact: iContactResponse;
  CreateContact: (data: iContactRequest) => void;
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
  const [listContact, SetlistContact] = useState<iContactResponse>(
    {} as iContactResponse
  );

  const CreateContact = async (data: iContactRequest) => {
    try {
      const dataContact = await Api.post(`/contacts/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Contato criado com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const GetAllContacts = async () => {
    try {
      const contacts = await Api.get(`/contacts/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactById = async (id: string) => {
    try {
      const contact = await Api.get(`/contacts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContacts = async (data: iContactRequest) => {
    try {
      const contacts = await Api.patch(
        `/contacts/${localStorage.getItem("idContact")}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        CreateContact,
        listContact,
        SetlistContact,
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
