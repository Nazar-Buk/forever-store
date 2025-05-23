import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = ({ bestsellers }) => {
  return (
    <section className="best-sellers">
      <div className="best-sellers__container">
        <div className="wrap-best-sellers__content">
          <Title text1="Best " text2="Seller" />
          <p className="sub-title">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
          <div className="product__cards">
            {bestsellers.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                images={item.images}
                price={item.price}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
