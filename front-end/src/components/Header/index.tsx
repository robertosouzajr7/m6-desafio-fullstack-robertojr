import { StyledHeader } from "./style";
import logo from "../../assets/logo-ico.png";
import { iChildren } from "../../contexts/userContext";

function Header() {
  return (
    <StyledHeader>
      <div>
        <img src={logo} alt="Logo" />
        <h2>Dashboard</h2>
      </div>
      <nav>
        <ul>
          <p>Bem vindo!</p>
          <li>
            <a href="#">Início</a>
          </li>
          <li>
            <a href="#">Sair</a>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;
