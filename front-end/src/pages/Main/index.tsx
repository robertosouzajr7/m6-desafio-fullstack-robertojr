import { MainStyled } from "./styles";
import Dashboard from "../dashboard";
import { FormRegisterUser } from "../../components/Form/Register";
import { FormLoginUser } from "../../components/Form/Login";
import logo from "../../assets/logo-ico.png";
import { MyContactsPage } from "../dashboard/MyContacts";
import { useContext, useEffect } from "react";
import { ContactContext } from "../../contexts/contactContext";
import { UserContext } from "../../contexts/userContext";
function Main() {
  return (
    <>
      {
        <MainStyled>
          <section>
            <figure>
              <img src={logo} alt="Logo" />
              <h1>SaveContacts</h1>
            </figure>
            <p>Nunca foi tão fácil salvar seus contatos!</p>
          </section>
          <section>
            <FormLoginUser />
            <FormRegisterUser />
          </section>
        </MainStyled>
      }
    </>
  );
}

export default Main;
