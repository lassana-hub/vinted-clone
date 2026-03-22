import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/Vinted_logo.png";
import "./Header.css";

const Header = ({
  handleToken,
  setIsConnected,
  title,
  setTitle,
  priceMax,
  priceMin,
  setPriceMax,
  setPriceMin,
  isConnected,
}) => {
  const location = useLocation();
  // console.log("ici =>", location);
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Vinted-logo" />
        </Link>
        <div className="filters">
          <div>
            <input
              type="text"
              placeholder="Recherche des articles"
              value={title}
              id="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            {/* // votre icone de loupe */}
          </div>
          <div className="price-inputs">
            <input
              type="number"
              name="priceMin"
              id="priceMin"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              type="number"
              name="priceMax"
              id="priceMax"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </div>
        </div>
        {isConnected ? (
          <div>
            <button
              onClick={() => {
                // optimisation via une fonction :
                // handleToken(null);
                Cookies.remove("userToken");
                setIsConnected(false);
              }}
              className="disconnect"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <nav>
            <Link to="/signup">
              <button>s'inscrire</button>
            </Link>
            <Link to="/login">
              <button>se connecter</button>
            </Link>
          </nav>
        )}

        <Link to="/publish">
          <button>ventds tes article</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
