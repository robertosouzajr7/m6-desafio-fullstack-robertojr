import { StyledDashboard, StyledFooter } from "./styles";
import Header from "../../components/Header";
import { FormRegisterContact } from "../../components/Form/RegisterContact";
function Dashboard() {
  return (
    <>
      <Header />
      <StyledDashboard>
        <h2>
          Para cadastrar um novo contato,
          <br /> preencher os campos abaixo
        </h2>
        <FormRegisterContact />
      </StyledDashboard>
      <StyledFooter>
        <div>
          <button className="btnAllContacts">Ver todos os Contatos</button>
        </div>
      </StyledFooter>
    </>
  );
}

export default Dashboard;
