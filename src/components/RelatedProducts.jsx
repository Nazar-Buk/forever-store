import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = (props) => {
  const { relatedProducts, setSize } = props;

  // залишив на память =)
  // useEffect(() => {
  //   if (products.length > 0) {
  //     let productsCopy = products.slice();

  //     productsCopy = productsCopy.filter((item) => {
  //       if (
  //         item.category === productData.category &&
  //         item.subCategory === productData.subCategory &&
  //         item._id !== productData._id
  //       ) {
  //         return item;
  //       }
  //     });

  //     setRelatedProducts(productsCopy.slice(0, 5));
  //   }
  // }, [productData]);

  console.log(relatedProducts, "relatedProducts");

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
                images={item.images}
                price={item.price}
                name={item.name}
                setSize={setSize}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
