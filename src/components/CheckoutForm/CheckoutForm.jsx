import "./CheckoutForm.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  // Permet de faire une requête à Stripe pour confirmer le paiement
  const stripe = useStripe();
  // Permet de récupérer le contenu des inputs
  const elements = useElements();

  // State qui gère les messages d'erreurs
  const [errorMessage, setErrorMessage] = useState("");
  // State qui gère le fait que le paiement a été effectué
  const [completed, setCompleted] = useState(false);
  // State qui gère le fait qu'on est en train de payer
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // On commence à charger
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    // Vérification et validation des infos entrées dans les inputs
    const elementsData = await elements.submit();
    if (elementsData.error) {
      // Affiche l'erreur en question
      setErrorMessage(elementsData.error.message);
      return;
    }

    try {
      // Demande au backend pour créer l'intention de paiement, il nous renverra la clef clientSecret :
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        {
          title,
          amount: price, // le prix indiquée dans l'annonce (pas en centimes ?)
        },
      );

      const clientSecret = response.data.client_secret;

      const stripeResponse = await stripe.confirmPayment({
        // elements contient les infos et la configuration du paiement
        elements: elements,
        clientSecret: clientSecret,
        // Éventuelle redirection
        confirmParams: {
          return_url: "http://localhost:5173/",
        },
        // Bloque la redirection
        redirect: "if_required",
      });

      // Si une erreur a lieu pendant la confirmation
      if (stripeResponse.error) {
        // On la montre au client
        setErrorMessage(stripeResponse.error.message);
      }

      //   console.log("stripeResponse =>", stripeResponse);

      // Si on reçoit un status succeeded on fait passer completed à true
      if (stripeResponse.paymentIntent.status === "succeeded") {
        setCompleted(true);
      }
      // On a fini de charger
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return completed ? (
    <div>
      <p>Paiement effectué ! Félicitations.</p>
      <p>
        <Link to="/">Continuer vos achats</Link>
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || !elements || isLoading}>
        Pay
      </button>
      {/* Éventuel message d'erreur */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
