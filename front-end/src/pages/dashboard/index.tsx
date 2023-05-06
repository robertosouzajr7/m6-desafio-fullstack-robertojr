import { StyledDashboard, StyledFooter } from "./styles";
import Header from "../../components/Header";
import { FormRegisterContact } from "../../components/Form/RegisterContact";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { ContactContext } from "../../contexts/contactContext";
import { CardContact } from "../../components/Card";
function Dashboard() {
  const { client_id, user, token, setToken, routes } = useContext(UserContext);
  const {
    contact,
    getToken,
    GetContactsById,
    setListContact,
    listContact,
    GetAllContacts,
  } = useContext(ContactContext);
  const [showContacts, setShowContacts] = useState<boolean>(false);
  useEffect(() => {
    if (!token || null) {
      routes(`/`);
    }

    localStorage.setItem("token", token);
    GetContactsById(user.id);

    if (listContact.length > 0) {
      GetAllContacts();
    }
  }, [contact]);

  if (showContacts === true) {
  }
  return (
    <>
      <Header />
      <StyledDashboard>
        <h2>
          {user.name}, Para cadastrar um novo contato,
          <br /> você deve preencher os campos abaixo
        </h2>
        <FormRegisterContact />
      </StyledDashboard>
      <StyledFooter>
        <div>
          <button onClick={() => GetAllContacts()} className="btnAllContacts">
            Ver todos os Contatos
          </button>
          {listContact.length > 0 ? <CardContact lista={listContact} /> : null}
          {listContact.length > 0 ? (
            <button
              className="btnAllContacts"
              onClick={() => setListContact([])}
            >
              Fechar
            </button>
          ) : null}
        </div>
      </StyledFooter>
    </>
  );
}

export default Dashboard;
