import { Link } from "react-router-dom";
import "./Offer.css";
const Offer = ({ data }) => {
  return (
    <main>
      <div className="container">
        <div className="offers">
          <section>
            {data.offers.map((offer) => {
              return (
                <Link to={`/offer/${offer._id}`} key={offer._id}>
                  <article key={offer._id}>
                    <div className="profile-owner">
                      {offer?.owner?.account?.avatar?.secure_url && (
                        <img
                          src={offer.owner.account.avatar.secure_url}
                          alt="le profile"
                        />
                      )}

                      <p>{offer.owner.account.username}</p>
                    </div>

                    <img src={offer.product_image.secure_url} alt="" />
                    <p>{offer.product_price}</p>
                    <p>{offer.product_details[0].MARQUE}</p>
                    {/* si l'offre a une taille, on met */}
                    <p>
                      {offer.product_details[1].TAILLE &&
                        offer.product_details[1].TAILLE}
                    </p>
                  </article>
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
};
export default Offer;
