import { StyledCardContact, StyledUl } from "./style";
import { useContext, useEffect } from "react";
import {
  ContactContext,
  iContactResponse,
} from "../../contexts/contactContext";
import { FormRegisterContact } from "../Form/RegisterContact";
import { FormUpdateContact } from "../Form/UpdateContact";
import { UserContext } from "../../contexts/userContext";

export function CardContact() {
  const { listContact, edit, setEdit, GetContactsById, DeleteContact } =
    useContext(ContactContext);
  const { GetClientbyToken } = useContext(UserContext);

  const GetId = (id: string) => {
    console.log(id);
    DeleteContact(id);
  };

  return (
    <>
      {listContact ? (
        <StyledUl>
          {listContact.contact.map((data: any) => (
            <StyledCardContact>
              <li key={data.id}>
                <h3>{data.name}</h3>
                <p>{data.phone}</p>
                <p>{data.email}</p>
                <div className="buttonEdit">
                  <button>editar</button>
                  <button onClick={() => GetId(data.id)}>deletar</button>
                </div>
              </li>
            </StyledCardContact>
          ))}
        </StyledUl>
      ) : null}
    </>
  );
}
