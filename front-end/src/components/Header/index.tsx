import { StyledHeader } from "./style";
import logo from "../../assets/logo-ico.png";
function Header() {
  return (
    <StyledHeader>
      <div>
        <img src={logo} alt="Logo" />
        <h2>Dashboard</h2>
      </div>
      <nav>
        <ul>
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
