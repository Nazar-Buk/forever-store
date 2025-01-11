import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  return (
    <section className="collection-page">
      <div className="collection-page__container collection-page__body">
        <div className="filter-options">
          <div
            className="wrap-filter-heading"
            onClick={() => setShowFilter(!showFilter)}
          >
            <h5>FILTERS</h5>
            <svg
              style={
                showFilter
                  ? { transform: "rotate(180deg)" }
                  : { transform: "rotate(0)" }
              }
              className="drop-down-arrow"
              fill="#ccc"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xml:space="preserve"
              stroke="#000000"
              stroke-width="0.0033"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  id="XMLID_222_"
                  d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
                />{" "}
              </g>
            </svg>
          </div>
          <div className={`categories-body ${showFilter ? "" : "sm-ds-none"}`}>
            <div className="category-box">
              <h6 className="category__title">Categories</h6>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Men"}
                />
                <div className="category-item__name">Men</div>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Women"}
                />
                <div className="category-item__name">Women</div>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Kids"}
                />
                <div className="category-item__name">Kids</div>
              </div>
            </div>
            <div className="category-box">
              <h6 className="category__title">TYPE</h6>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Topwear"}
                />
                <div className="category-item__name">Top Wear</div>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Bottomwear"}
                />
                <div className="category-item__name">Bottom Wear</div>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Winterwear"}
                />
                <div className="category-item__name">Winter Wear</div>
              </div>
            </div>
          </div>
        </div>
        <div className="collection__content">
          <div className="collection-content__settings">
            <Title text1="All " text2="Collections" />
            <div className="wrap-sorting-select">
              <select className="sorting-box">
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>
          <div className="collection__products">
            {filterProducts.map((item) => (
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

export default Collection;
