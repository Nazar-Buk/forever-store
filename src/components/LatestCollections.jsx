import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext); // використовуємо контекст
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="latest-collection">
      <div className="latest-collection__container">
        <div className="wrap-latest-collection__content">
          <Title text1="Latest " text2="Collections" />
          <p className="sub-title">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the.
          </p>
          <div className="product__cards">
            {latestProducts.map((item) => (
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

export default LatestCollections;
