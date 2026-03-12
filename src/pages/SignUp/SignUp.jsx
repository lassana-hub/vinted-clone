import "./SignUp.css";
// importer axios pour aler chercher la data
import axios from "axios";
// import le js-cookie
import Cookies from "js-cookie";
// import useState
import { useState } from "react";
const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUserName = (event) => {
    const value = event.target.value;
    setUserName(value);
    // console.log(userName); OK
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
          newsletter: true,
        },
      );
      console.log(response.data.token);
      Cookies.set("token", response.data.token); // { expires: 7 }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="myForm">
      <div className="container">
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
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
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
