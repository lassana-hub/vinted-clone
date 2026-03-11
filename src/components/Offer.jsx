const Offer = ({ data }) => {
  return (
    <div className="offers">
      {data.offers.map((offer) => {
        return (
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
        );
      })}
    </div>
  );
};
export default Offer;
