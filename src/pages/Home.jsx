import { Link } from "react-router-dom";
import Offer from "../components/Offer";

const Home = ({ data }) => {
  // le composant Link sert à naviguer de page en page en modifiant l'URL sans rafraichir le navigateur
  // les balises seront donc maintenant réservées :
  //  - à diriger vers une ancre (id) de la meme page
  //  - à re-diriger vers un site externe
  return (
    <main>
      <h1>PAGE HOME</h1>
      <Offer data={data} />
      <div className="space">
        <Link to="/profile"></Link>
      </div>
      <p>
        <a href="https://www.google.fr">Go to profile with a tag</a>
      </p>
    </main>
  );
};

export default Home;
