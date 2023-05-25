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
  const { listContact, SetlistContact, GetAllContacts, GetContactsByClientId } =
    useContext(ContactContext);
  const [showContacts, setShowContacts] = useState<boolean>(false);
  console.log(listContact);
  useEffect(() => {
    if (!token || null) {
      routes(`/`);
    }

    localStorage.setItem("token", token);
    //GetContactsByClientId(user.id);
    if (listContact.contact) {
      GetAllContacts();
      GetContactsByClientId();
    }
  }, []);

  if (showContacts === true) {
  }
  useEffect(() => {
    GetClient();
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
            <button className="btnAllContacts" onClick={() => {SetlistContact([])}}>
              Fechar
            </button>
          </div>
          {listContact.contact ? (
            <CardContact lista={listContact.contact} />
          ) : null}
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
