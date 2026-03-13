import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import OfferPage from "./pages/Offer/OfferPage";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  // crée une variable state pour tester la connexion
  const [isConnected, setIsConnected] = useState(false);
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<OfferPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
