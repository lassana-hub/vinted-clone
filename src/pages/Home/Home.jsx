import { Link } from "react-router-dom"; // le composant Link sert à naviguer de page en page en modifiant l'URL sans rafraichir le navigateur
import Offer from "../../components/Offer/Offer";

// import axios pour aller cherecher la data
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({ title, priceMin, priceMax }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        if (priceMin) {
          if (filters) {
            filters += "&priceMin=" + priceMin;
          } else {
            filters += "?priceMin=" + priceMin;
          }
        }
        if (priceMax) {
          if (filters) {
            filters += "&priceMax=" + priceMax;
          } else {
            filters += "?priceMax=" + priceMax;
          }
        }
        const response = await axios.get(
          " https://lereacteur-vinted-api.herokuapp.com/offers" + filters,
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
  }, [title, priceMin, priceMax]);
  return isLoading ? <p>Loading data ....</p> : <Offer data={data} />;
};

export default Home;
