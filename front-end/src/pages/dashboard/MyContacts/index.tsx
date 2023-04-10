import { StyledDashboard } from "../styles";
import { CardContact } from "../../../components/Card";
import Header from "../../../components/Header";
export function MyContactsPage() {
  return (
    <>
      <Header />
      <StyledDashboard>
        <h2>Meus Contatos</h2>
        <CardContact />
        <CardContact />
        <button>Cadastrar novo Usuário</button>
      </StyledDashboard>
    </>
  );
}
