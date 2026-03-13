import axios from "axios";
// import le js-cookie
import Cookies from "js-cookie";
// import useState
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          // https://lereacteur-vinted-api.herokuapp.com/user/signup
          email: email,
          password: password,
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
          <button type="submit">Se connecter</button>
          <p className="login-text">
            Pas encore de compte ? <a href="#">connect-toi</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
