import { Link } from "react-router-dom";
import logo from "../assets/Vinted_logo.png";
const Header = () => {
  return (
    <header>
      <img src={logo} alt="Vinted-logo" />
      <nav>
        <button>s'inscrire</button>
        <button>se connecter</button>
        <button>ventds tes article</button>
      </nav>
    </header>
  );
};

export default Header;
