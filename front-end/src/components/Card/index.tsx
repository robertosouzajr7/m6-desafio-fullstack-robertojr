import { StyledCardContact, StyledUl } from "./style";
import { useContext, useEffect, useState } from "react";
import {
  ContactContext,
  iContactResponse,
} from "../../contexts/contactContext";
import { FormRegisterContact } from "../Form/RegisterContact";
import { FormUpdateContact } from "../Form/UpdateContact";

export function CardContact(lista: any) {
  const { listContact, edit, setEdit, contact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {}, []);

  const editUser = (id: string) => {
    console.log(id);
    localStorage.setItem("idContact", id);
    setShowModal(true);
  };

  const apagarContato = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <StyledUl>
        {contact.contact.map((data: any) => (
          <StyledCardContact>
            <li key={data.id}>
              <h3>{data.name}</h3>
              <p>{data.phone}</p>
              <p>{data.email}</p>
              <div className="buttonEdit">
                <button onClick={() => editUser(data.id)}>editar</button>
                <button onClick={() => apagarContato(data.id)}>deletar</button>
              </div>
            </li>
          </StyledCardContact>
        ))}
      </StyledUl>
      <StyledUl>{showModal === true ? <FormUpdateContact /> : null}</StyledUl>
    </>
  );
}
