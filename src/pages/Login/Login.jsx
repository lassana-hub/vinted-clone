import axios from "axios";
// import le js-cookie
import Cookies from "js-cookie";
// import useState
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
const Login = ({ setIsConnected }) => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation permet de récupérer les informations de navigation de l'utilisateur :

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    // console.log(email); OK
  };
  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    // console.log(password); OK
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        },
      );
      //  console.log(response.data); OK
      if (response.data.token) {
        Cookies.set("userToken", response.data.token);
        // on change le state de connection (pour l'affichage dans le header) :
        setIsConnected(true);
        navigate("/");
        // optimisation via une fonction :
        // handleToken(response.data.token);

        // if (location.state) {
        //   navigate(location.state.from);
        // } else {
        //   navigate("/");
        // }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="myForm">
      <div className="signup-form-container">
        <h1>Se connecter</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button type="submit">Se connecter</button>
          <p className="login-text">
            <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
          </p>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
};
export default Login;
