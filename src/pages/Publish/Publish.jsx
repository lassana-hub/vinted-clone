import "./Publish.css";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import axios from "axios";

const Publish = () => {
  // states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  // input de type file(picture) n'a pas de value : donc pour recupérer l'image on utilise =>> `event.target.files`
  // Pour designer un input de type file, on le masque, et on designe son label !
  const [picture, setPicture] = useState("");
  const [previewPicture, setPreviewPicture] = useState(null); // picture preview before sending

  const navigate = useNavigate(); // Déclenché par une action (click, API, etc.)et utilisé dans une fonction (event, logique, effet)

  //Get the token from cookies to check if the user is authenticated.
  const isAuth = Cookies.get("userToken");

  const handleFormChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // créer un formdata
    const formData = new FormData();
    // le remplir avec les données des inputs
    formData.append("title", title);
    formData.append("description", description);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("picture", picture);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      // envoyer le formdata avec axios
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      // rediriger vers la page home après submit
      navigate("/"); // ce navigate (hook) depend declache après l'evenement submit
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <main className="publish">
      {/* Si on a le token ==> on affiche la page Publish */}
      {isAuth ? (
        <div className="container">
          <h1>Vends tes articles</h1>
          <form onSubmit={handleSubmit}>
            <section>
              {previewPicture && (
                <img src={previewPicture} alt="previsualisation de l'image" />
              )}
              <label htmlFor="picture" className="file-label">
                + Ajoute une photo
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  // create the preview of the picture before sending it
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreviewPicture(objectUrl);
                }}
              />
            </section>
            <section>
              <div>
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    handleFormChange(event, setTitle);
                  }}
                />
              </div>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(event) => {
                  handleFormChange(event, setDescription);
                }}
              ></textarea>
            </section>
            <section>
              <div>
                <label htmlFor="brand">Marque</label>
                <input
                  type="text"
                  id="brand"
                  value={brand}
                  onChange={(event) => {
                    handleFormChange(event, setBrand);
                  }}
                />
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <input
                  type="text"
                  id="size"
                  value={size}
                  onChange={(event) => {
                    handleFormChange(event, setSize);
                  }}
                />
              </div>
              <div>
                <label htmlFor="color">Couleur</label>
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(event) => {
                    handleFormChange(event, setColor);
                  }}
                />
              </div>
              <div>
                <label htmlFor="condition">État</label>
                <input
                  type="text"
                  id="condition"
                  value={condition}
                  onChange={(event) => {
                    handleFormChange(event, setCondition);
                  }}
                />
              </div>
              <div>
                <label htmlFor="city">Lieu</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(event) => {
                    handleFormChange(event, setCity);
                  }}
                />
              </div>
            </section>
            <section>
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(event) => {
                    handleFormChange(event, setPrice);
                  }}
                />
              </div>
              <input type="checkbox" name="trade" id="trade" />
            </section>
            <button>Ajouter</button>
          </form>
        </div>
      ) : (
        // si on a pas le token on affiche la page login
        // et on envoi la route de la page actuelle
        <Navigate to="/login" state={{ from: "/publish" }} />
      )}
    </main>
  );
};

export default Publish;
