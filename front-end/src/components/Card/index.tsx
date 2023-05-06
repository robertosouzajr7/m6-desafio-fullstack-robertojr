import { StyledCardContact, StyledUl } from "./style";
import { useContext, useEffect } from "react";
import {
  ContactContext,
  iContactResponse,
} from "../../contexts/contactContext";
import { FormRegisterContact } from "../Form/RegisterContact";
import { FormUpdateContact } from "../Form/UpdateContact";

export function CardContact(lista: any) {
  const { listContact, edit, setEdit } = useContext(ContactContext);
  useEffect(() => {}, []);

  const editUser = (id: string) => {
    setEdit(true);
    localStorage.setItem("idContact", id);
  };

  /*  {edit === "true" ? (
    <input type="text" placeholder="Insira nome" />
  ) : null} */

  const apagarContato = (id: string) => {
    console.log(id);
  };
  return (
    <>
      {edit ? (
        <FormUpdateContact />
      ) : (
        <StyledUl>
          {listContact.map((data: iContactResponse) => (
            <StyledCardContact>
              <li key={data.id}>
                <h3>{data.name}</h3>
                <p>{data.phone}</p>
                <p>{data.email}</p>
                <div className="buttonEdit">
                  <button onClick={() => editUser(data.id)}>editar</button>
                  <button onClick={() => apagarContato(data.id)}>
                    deletar
                  </button>
                </div>
              </li>
            </StyledCardContact>
          ))}
        </StyledUl>
      )}
    </>
  );
}
