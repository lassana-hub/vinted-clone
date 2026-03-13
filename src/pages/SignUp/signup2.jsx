import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./Signup.css";

const Signup = ({ handleToken, setIsConnected }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <main>
      <div className="container">
        <h1>S'inscrire</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // envoyer les données à l'API pour obtenir un token (qui confirmera qu'on est bien authentifié)
            // vérifie que les valeurs sont les bonnes :
            console.log(username, email, password, newsletter);
            // déclarer une variable pour récupérer la réponse
            // mettre le await pour attendre que la promise soit résolue
            // donc mettre onSubmit en fonction async
            // ne pas oublier non plus de mettre un pti try/catch
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                  newsletter: newsletter,
                },
              );
              console.log(response.data); // {_id: '69b3e92f364b59bece8bd152', email: 'wam2@gmail.com', token: '4ZKF3wwODYbE-x3MsZhD5sUrWzhHhJYF5WZQWiEA07QulERxEREaRYkJX1tkG5bN', account: {…}}
              // si ya un token dans la réponse
              if (response.data.token) {
                setErrorMessage("");
                // on le stockera dans les cookies
                Cookies.set("userToken", response.data.token);
                // on change le state de connection (pour l'affichage dans le header) :
                setIsConnected(true);

                // optimisation en une seule fonction :
                // handleToken(response.data.token);

                // on redirige maintenant notre utilisateur vers la page home :
                navigate("/");
              }
              // sinon, on mettra une alerte
            } catch (error) {
              if (error.response) {
                setErrorMessage(error.response.data.message);
              } else {
                console.log(error);
              }
            }
          }}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
          />
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}
          />

          <button>S'inscrire</button>
        </form>
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </main>
  );
};

export default Signup;
