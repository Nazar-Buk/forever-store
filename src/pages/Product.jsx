import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";

import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams(); // потім треба буде коли буде бек і база даних
  const { products, currency, addToCart } = useContext(ShopContext);

  const smallPicturesBoxRef = useRef(null);

  const [productData, setProductData] = useState(false); // було false
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
    const box = smallPicturesBoxRef.current;

    if (box) {
      setIsScrollable(box.scrollWidth > box.clientWidth);
    }

    if (productData.image?.length <= 1) {
      setIsScrollable(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    checkIfScrollableBox();
    window.addEventListener("resize", checkIfScrollableBox);

    return () => window.removeEventListener("resize", checkIfScrollableBox);
  }, [productData, productId]);

  return productData ? (
    <section className="product-page">
      <section className="product__container">
        <div className="product__box">
          <div className="product__images-box">
            {productData.image?.length > 1 && (
              <div ref={smallPicturesBoxRef} className="small-images">
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
            )}

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
            <div className="details__title">{productData.name}</div>
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
            <p className="details__small-desc">{productData.description}</p>
            <div className="details__choose-size">
              <p className="choose-size__title">Select Size</p>
              <div className="choose-size__items">
                {productData.sizes?.map((item, index) => (
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
            <button
              onClick={() => addToCart(productId, size)}
              className="add-to-cart-btn"
            >
              ADD TO CART
            </button>
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
      <section className="product__description">
        <div className="description__container">
          <div className="description__body">
            <b className="description__title-tab">Description</b>
            <div className="description-text-box">
              <p className="description__text">
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
                E-commerce websites have gained immense popularity due to their
                convenience, accessibility, and the global reach they offer.
              </p>
              <p className="description__text">
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </div>
          </div>
        </div>
      </section>
      <RelatedProducts productData={productData} setSize={setSize} />
    </section>
  ) : (
    <div>lalala</div>
  );
};

export default Product;
