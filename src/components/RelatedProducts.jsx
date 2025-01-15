import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = (props) => {
  const { productData } = props;

  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const allRelatedProducts = products.filter(
      (item) => item.subCategory === productData.subCategory
    );

    setRelatedProducts(allRelatedProducts.slice(0, 5));
  }, [productData]);

  return (
    <section className="related-products">
      <div className="related-products__container">
        <div className="wrap-related-products__content">
          <Title text1="Related " text2="Products" />
          <div className="product__cards">
            {relatedProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
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

export default RelatedProducts;
