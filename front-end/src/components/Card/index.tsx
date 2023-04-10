import { StyledCardContact } from "./style";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import Api from "../../services/api";
import { iContact } from "../Form/RegisterContact";

export function CardContact() {
  const { contact, listContacts, setLisContacts } = useContext(UserContext);

  useEffect(() => {
    async function getUserContact() {
      try {
        const contact: [] = await Api.get("/contacts");
        setLisContacts(contact);
      } catch (err) {
        console.log(err);
      }
    }
    getUserContact();
  }, []);

  const editUser = () => {
    console.log("editado");
  };

  const apagarContato = () => {
    console.log("apagar");
  };
  return (
    <ul>
      {listContacts.map((data: any) => (
        <li>
          <StyledCardContact>
            <figure>
              <img src={data.urlFoto} alt="foto de perfil do Contato" />
            </figure>
            <caption>
              <h3>{data.name}</h3>
              <p>{data.phone}</p>
              <p>{data.email}</p>
              <p>{data.notation}</p>
              <div className="buttonEdit">
                <button onClick={editUser}>editar</button>
                <button onClick={apagarContato}>deletar</button>
              </div>
            </caption>
          </StyledCardContact>
        </li>
      ))}
    </ul>
  );
}
