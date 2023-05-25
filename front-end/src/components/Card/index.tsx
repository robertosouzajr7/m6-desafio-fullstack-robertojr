import { StyledCardContact, StyledUl } from "./style";
import { useContext, useEffect, useState } from "react";
import {
  ContactContext,
  iClientResponse,
  iContactRequest,
} from "../../contexts/contactContext";
import { FormUpdateContact } from "../Form/UpdateContact";

export function CardContact(lista: any) {
  const { listContact } = useContext(ContactContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  console.log(lista);
  useEffect(() => {}, []);
  const editUser = (id: string) => {
    localStorage.setItem("idContact", id);
    setShowModal(true);
  };

  const apagarContato = (id: string) => {
    setShowModal(false);
  };
  const { contact } = listContact;

  return (
    <>
      <StyledUl>
        {contact?.map((data: iClientResponse) => (
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
        {showModal === true ? <FormUpdateContact /> : null}
        {showModal === false ? null : <FormUpdateContact />}
      </StyledUl>
    </>
  );
}
