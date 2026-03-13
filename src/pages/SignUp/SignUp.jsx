import "./Signup.css";
// importer axios pour aler chercher la data
import axios from "axios";
// import le js-cookie
import Cookies from "js-cookie";
// import les Hooks
import { useState, useNavigate } from "react";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const handleUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
    console.log("UserName is => " + userName);
    console.log("value is =>" + value);
  };
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
    // appeler la fonction fetcthData qui va faire le requete
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          // https://lereacteur-vinted-api.herokuapp.com/user/signup
          email: email,
          username: userName,
          password: password,
          newsletter: newsletter,
        },
      );
      // console.log(response.data.token); // OK

      // si on a un token dans la réponse: on fait les étapes suivantes
      if (response.data.token) {
        // 1 - on le stocke dans les cookies
        Cookies.set("userToken", response.data.token); // { expires: 7 }
        // on change le state du button connection (pour l'affichage dans le header) :
        setIsConnected(true);
        setErrorMessage("");
        // optimisation en une seule fonction :
        // handleToken(response.data.token);

        // on redirige maintenant notre utilisateur vers la page home :
        navigate("/");
      }
      // sinon, on mettra une alerte
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myForm">
      <div className="signup-form-container">
        <h1>S'inscrire</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              required
              onChange={handleUserName}
              value={userName}
            />
          </div>
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
              onChange={handlePassword}
            />
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="newsletter" />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
          </div>

          <button type="submit">S'inscrire</button>

          <p className="login-text">
            Tu as déjà un compte ? <a href="#">connect-toi</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
