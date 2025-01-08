import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="product-card" to={`/product/${id}`}>
      <div className="wrap-product-card__img">
        <img src={image[0]} alt="Product picture" />
      </div>
      <p className="product-card__name">{name}</p>
      <p className="product-card__price">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
