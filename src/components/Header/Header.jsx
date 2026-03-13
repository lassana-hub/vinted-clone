import { Link } from "react-router-dom";
import logo from "../../assets/Vinted_logo.png";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Vinted-logo" />
      </Link>
      <input type="text" />
      <nav>
        <Link to="/signup">
          <button>s'inscrire</button>
        </Link>
        <Link to="/login">
          <button>se connecter</button>
        </Link>
        <button>ventds tes article</button>
      </nav>
    </header>
  );
};

export default Header;
