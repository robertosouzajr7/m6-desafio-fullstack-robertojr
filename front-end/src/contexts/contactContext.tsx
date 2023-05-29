import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import { stringify } from "querystring";
import { toast } from "react-hot-toast";

export interface iContactRequest {
  name: string;
  phone: string;
  email: string;
  client_id: string;
}

export interface iContactResponse {
  name: string;
  email: string;
  phone: string;
  created_at: string;
  id: string;
}

export interface iListContactResponse {
  contact: [];
  created_at: string;
  email: string;
  id: string;
  name: string;
  password: string;
  phone: string;
}

interface iContactContext {
  setContact: React.Dispatch<React.SetStateAction<iContactResponse>>;
  CreateContact: (data: iContactRequest) => void;
  contact: iContactResponse;
  listContact: iListContactResponse;
  setListContact: React.Dispatch<React.SetStateAction<iListContactResponse>>;
  getToken: string | null;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  GetAllContacts: () => void;
  GetContactsById: () => void;
  UpdateContacts: (id: string) => void;
  showCard: boolean;
  setShowCard: React.Dispatch<React.SetStateAction<boolean>>;
  DeleteContact: (id: string) => void;
}

interface iChildren {
  children: ReactNode;
}

export const ContactContext = createContext<iContactContext>(
  {} as iContactContext
);

function ContactProvider({ children }: iChildren) {
  const getToken = localStorage.getItem("token");
  const [contact, setContact] = useState<iContactResponse>(
    {} as iContactResponse
  );
  const [listContact, setListContact] = useState<iListContactResponse>(
    {} as iListContactResponse
  );
  const [edit, setEdit] = useState(false);
  const [showCard, setShowCard] = useState<boolean>(false);

  const CreateContact = async (data: iContactRequest) => {
    const getToken = localStorage.getItem("token");
    console.log(getToken);
    await Api.post(`/contacts/`, data, {
      headers: { Authorization: `Bearer ${getToken}` },
    })
      .then((res) => {
        setContact(res.data);
        console.log(res.data);
        toast.success("Contato criado com sucesso!");
      })
      .catch((error) => console.log(error));
  };

  const GetAllContacts = async () => {
    try {
      const contacts = await Api.get(`/contacts/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(contacts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetContactsById = async () => {
    const validToken = localStorage.getItem("token");
    const idClient = localStorage.getItem("idClient");
    try {
      const contacts = await Api.get(`/contacts/clients/${idClient}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });
      console.log(contacts.data);
      setShowCard(true);
      setListContact(contacts.data);
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteContact = async (id: string) => {
    const validToken = localStorage.getItem("token");
    try {
      const contacts = await Api.delete(`/contacts/${id}`, {
        headers: { Authorization: `Bearer ${validToken}` },
      });
      console.log(contacts.data);
      GetContactsById();
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateContacts = async (id: string) => {
    try {
      const contacts = await Api.patch(`/contacts/${id}`, {
        headers: { Authorization: `Bearer ${getToken}` },
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
        getToken,
        GetAllContacts,
        GetContactsById,
        UpdateContacts,
        showCard,
        setShowCard,
        DeleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
