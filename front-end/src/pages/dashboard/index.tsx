import { StyledDashboard, StyledFooter } from "./styles";
import Header from "../../components/Header";
import { FormRegisterContact } from "../../components/Form/RegisterContact";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import {
  ContactContext,
  iListContactResponse,
} from "../../contexts/contactContext";
import { CardContact } from "../../components/Card";
function Dashboard() {
  const { user, GetClientbyToken } = useContext(UserContext);
  const { GetContactsById, listContact, setListContact, showCard } =
    useContext(ContactContext);
  useEffect(() => {
    console.log(user);
    GetClientbyToken();
    // GetContactsById();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deletar = () => {
    setListContact(listContact);
  };

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
          <button onClick={() => GetContactsById()} className="btnAllContacts">
            Ver todos os Contatos
          </button>
          {showCard === true ? <CardContact /> : null}
        </div>
      </StyledFooter>
    </>
  );
}

export default Dashboard;
