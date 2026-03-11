import { Link } from "react-router-dom";
const Offer = ({ data }) => {
  return (
    <div className="offers">
      {data.offers.map((offer) => {
        return (
          <Link to={`/offer/${offer._id}`}>
            <div>
              <div key={offer.id}>
                <img src={offer.product_image.secure_url} alt="" />
                <p>{offer.product_price}</p>
              </div>
              <div>
                {offer.product_details.map((elem) => {
                  return (
                    <div>
                      <p>{elem.MARQUE}</p>
                      <p>{elem.TAILLE}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Offer;
