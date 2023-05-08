import { StyledDashboard, StyledFooter } from "./styles";
import Header from "../../components/Header";
import { FormRegisterContact } from "../../components/Form/RegisterContact";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  ContactContext,
  iContactResponse,
} from "../../contexts/contactContext";
import { CardContact } from "../../components/Card";
import Api from "../../services/api";
function Dashboard() {
  const { user, token, routes, GetClient } = useContext(UserContext);
  const {
    contact,
    setListContact,
    listContact,
    GetAllContacts,
    setContact,
    GetContactsByClientId,
  } = useContext(ContactContext);
  const [showContacts, setShowContacts] = useState<boolean>(false);
  console.log(listContact);
  useEffect(() => {
    if (!token || null) {
      routes(`/`);
    }

    localStorage.setItem("token", token);
    //GetContactsByClientId(user.id);
    if (listContact.length > 0) {
      GetAllContacts();
    }
  }, [contact]);

  if (showContacts === true) {
  }
  useEffect(() => {
    GetClient();
    /* const GetClientbyId = async () => {
      await Api.get(`/clients/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((response) => {
          console.log(response.data, user);
          setUser(response.data);
        })
        .catch((err) => console.log(err));
    };
    GetClientbyId(); */
  }, []);

  return (
    <>
      <Header />
      <StyledDashboard>
        <h2>
          {user.name}, Para cadastrar um novo contato,
          <br /> você deve preencher os campos abaixo
        </h2>
        <FormRegisterContact />
        <div className="divContacts">
          <div className="divbtn">
            <button
              onClick={() => GetContactsByClientId()}
              className="btnAllContacts"
            >
              Ver todos os Contatos
            </button>
            <button
              className="btnAllContacts"
              onClick={() => setContact(contact)}
            >
              Fechar
            </button>
          </div>
          {contact.name ? <CardContact lista={contact} /> : null}
        </div>
      </StyledDashboard>
      <StyledFooter>
        <div>
          <p>Todos os Direitos reservados - Roberto Jr</p>
        </div>
      </StyledFooter>
    </>
  );
}

export default Dashboard;
