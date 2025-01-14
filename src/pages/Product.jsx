import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams(); // потім треба буде коли буде бек і база даних
  const smallPicturesBox = useRef(null);

  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState(productData.image?.[0]);
  const [size, setSize] = useState("");
  const [isScrollable, setIsScrollable] = useState(false);

  const fetchProductData = async () => {
    // to do: можливо краще використати find
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  const checkIfScrollableBox = () => {
    const box = smallPicturesBox.current;

    if (box) {
      setIsScrollable(box.scrollWidth > box.clientWidth);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    checkIfScrollableBox();
    window.addEventListener("resize", checkIfScrollableBox);
    console.log(smallPicturesBox, "smallPicturesBox");

    return () => window.removeEventListener("resize", checkIfScrollableBox);
  }, [productData]);

  return productData ? (
    <section className="product-page">
      <section className="product__container">
        <div className="product__box">
          <div className="product__images-box">
            <div ref={smallPicturesBox} className="small-images">
              {productData.image.map((item, index) => {
                return (
                  <div
                    onClick={() => setImage(item)}
                    key={index}
                    className="wrap-small-img"
                  >
                    <img src={item} alt="small product item" />
                  </div>
                );
              })}
            </div>

            <div className="large-image">
              <div className="wrap-large-img">
                <img src={image} alt="large image" />
              </div>
            </div>
            {isScrollable && (
              <div className="scroll-tip">
                <svg
                  className="scroll__arrow-left"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  enableBackground="new 0 0 256 256"
                  xmlSpace="preserve"
                >
                  <metadata>
                    {" "}
                    Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                  </metadata>
                  <g>
                    <g>
                      <path d="M10,123.8h219.1v8.4H10V123.8z" />
                      <path d="M203.9,115.4L246,128l-42.1,12.6V115.4z" />
                    </g>
                  </g>
                </svg>

                <p className="tip-text">Прокрутіть</p>

                <svg
                  className="scroll__arrow-right"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  enableBackground="new 0 0 256 256"
                  xmlSpace="preserve"
                >
                  <metadata>
                    {" "}
                    Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                  </metadata>
                  <g>
                    <g>
                      <path d="M10,123.8h219.1v8.4H10V123.8z" />
                      <path d="M203.9,115.4L246,128l-42.1,12.6V115.4z" />
                    </g>
                  </g>
                </svg>
              </div>
            )}
          </div>
          <div className="product__details-box">
            <div className="details__title">
              Men Round Neck Pure Cotton T-shirt
            </div>
            <div className="details__rating">
              <div className="rating__stars">
                <div className="wrap-star">
                  <img src={assets.star_icon} alt="rating icon" />
                </div>
                <div className="wrap-star">
                  <img src={assets.star_icon} alt="rating icon" />
                </div>
                <div className="wrap-star">
                  <img src={assets.star_icon} alt="rating icon" />
                </div>
                <div className="wrap-star">
                  <img src={assets.star_icon} alt="rating icon" />
                </div>
                <div className="wrap-star">
                  <img src={assets.star_dull_icon} alt="rating icon" />
                </div>
              </div>
              <div className="rating__counts">(122)</div>
            </div>
            <div className="details__price">
              {currency}
              {productData.price}
            </div>
            <p className="details__small-desc">
              A lightweight, usually knitted, pullover shirt, close-fitting and
              with a round neckline and short sleeves, worn as an undershirt or
              outer garment.
            </p>
            <div className="details__choose-size">
              <p className="choose-size__title">Select Size</p>
              <div className="choose-size__items">
                {productData.sizes.map((item, index) => (
                  <div
                    onClick={() => setSize(item)}
                    key={index}
                    className={`choose-size__item ${
                      item === size ? "active" : ""
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <button className="add-to-cart-btn">ADD TO CART</button>
            <hr />
            <div className="details__policy">
              <p className="policy">100% Original product.</p>
              <p className="policy">
                Cash on delivery is available on this product.
              </p>
              <p className="policy">
                Easy return and exchange policy within 7 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  ) : (
    <div>lalala</div>
  );
};

export default Product;
