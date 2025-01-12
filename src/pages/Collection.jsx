import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const { value } = e.target;

    // перевіряю чи є в масиві те що потрапляє у value, якщо є
    // то беру актуальний стейт, фільтрую його та записую все окрім value,
    // щоб воно пропало з масиву,(я зняв галочку з Checkbox)
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      // перевіряю чи є в масиві те що потрапляє у value, якщо нема то додаю його в масив
      setCategory((prev) => [...prev, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;

    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice(); // зробив копію всіх продуктів

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortType && sortType !== "relevant") {
      if (sortType === "low-high") {
        productsCopy = productsCopy.sort((a, b) => a.price - b.price);
      }

      if (sortType === "high-low") {
        productsCopy = productsCopy.sort((a, b) => b.price - a.price);
      }
    }

    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice(); //filteredProducts copy

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();

        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [subCategory, category, search]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

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
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
              stroke="#000000"
              strokeWidth="0.0033"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                  onChange={toggleCategory}
                  id="men"
                />
                <label htmlFor="men" className="category-item__name">
                  Men
                </label>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Women"}
                  onChange={toggleCategory}
                  id="women"
                />
                <label htmlFor="women" className="category-item__name">
                  Women
                </label>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Kids"}
                  onChange={toggleCategory}
                  id="kids"
                />
                <label htmlFor="kids" className="category-item__name">
                  Kids
                </label>
              </div>
            </div>
            <div className="category-box">
              <h6 className="category__title">TYPE</h6>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Topwear"}
                  onChange={toggleSubCategory}
                  id="top-wear"
                />
                <label htmlFor="top-wear" className="category-item__name">
                  Top Wear
                </label>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Bottomwear"}
                  onChange={toggleSubCategory}
                  id="bottom-wear"
                />
                <label htmlFor="bottom-wear" className="category-item__name">
                  Bottom Wear
                </label>
              </div>
              <div className="wrap-category-item">
                <input
                  className="category-item__checkbox"
                  type="checkbox"
                  value={"Winterwear"}
                  onChange={toggleSubCategory}
                  id="winter-wear"
                />
                <label htmlFor="winter-wear" className="category-item__name">
                  Winter Wear
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="collection__content">
          <div className="collection-content__settings">
            <Title text1="All " text2="Collections" />
            <div className="wrap-sorting-select">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="sorting-box"
                name="sorting"
              >
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
