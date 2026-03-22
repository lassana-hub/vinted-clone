import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import OfferPage from "./pages/Offer/OfferPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish/Publish";
import Payment from "./pages/Payment/Payment";

function App() {
  // crée une variable state pour tester la connexion
  const [isConnected, setIsConnected] = useState(
    Cookies.get("userToken") || null,
  );
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  const handleToken = (token) => {
    if (token) {
      Cookies.set("userToken", token);
      setIsConnected(true);
    } else {
      Cookies.remove("userToken");
      setIsConnected(false);
    }
  };

  return (
    <>
      <Router>
        <Header
          handleToken={handleToken}
          setIsConnected={setIsConnected}
          isConnected={isConnected}
          title={title}
          setTitle={setTitle}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home title={title} priceMin={priceMin} priceMax={priceMax} />
            }
          />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route
            path="/signup"
            element={
              <Signup
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isConnected={isConnected}
                setIsConnected={setIsConnected}
                handleToken={handleToken}
              />
            }
          />
          <Route path="/publish" element={<Publish />} />
          <Route path="/payment" element={<Payment />} />

          <Route
            path="*"
            element={<div className="container">Route introuvable</div>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
