import { useParams, Link } from "react-router-dom";

const OfferPage = () => {
  // useParams est le hook servant à récupérer le(s) paramètre(s) params associé à la route :
  const currentParams = useParams();
  //   console.log(currentParams); // {id: '12345678'}
  //   const { id } = currentParams;
  //   console.log(id); // 12345678

  return (
    <main>
      <h1>PAGE OFFER</h1>
      <p>L'id du offer est : {currentParams.id}</p>
      <Link to="/">Back to Home page</Link>
    </main>
  );
};

export default OfferPage;
