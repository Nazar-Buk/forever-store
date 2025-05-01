import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, images, price, name, setSize }) => {
  const { productId } = useParams(); // потім треба буде коли буде бек і база даних
  const { currency } = useContext(ShopContext);
  console.log(images, "images");

  return (
    <Link
      onClick={() => productId && setSize("")}
      className="product-card"
      to={`/product/${id}`}
    >
      <div className="wrap-product-card__img">
        <img src={images[0]?.url} alt="Product picture" />
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
