import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import OfferPage from "./pages/OfferPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Looged from "./pages/Login/Looged";
// import axios pour aller cherecher la data
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://lereacteur-vinted-api.herokuapp.com/offers",
        );
        // console.log(response.data);
        // console.log(response.data.offers);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>Loading data ....</p>
  ) : (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/looged" element={<Looged />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
