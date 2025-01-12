import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  const location = useLocation();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchData, setSearchData] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(searchData);
    }
  };

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setIsSearchVisible(true);
    } else {
      setIsSearchVisible(false);
    }
  }, [location]);

  return showSearch && isSearchVisible ? (
    <section className="search">
      <div className="search__container search__body">
        <div className="search__body">
          <div className="wrap-search">
            <input
              className="search-input"
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div
              onClick={() => {
                setSearch(searchData);
              }}
              className="wrap-search-img"
            >
              <img src={assets.search_icon} alt="search icon" />
            </div>
          </div>

          <div
            onClick={() => {
              setSearch("");
              setSearchData("");
              setShowSearch(false);
            }}
            className="wrap-close-search-img"
          >
            <img src={assets.cross_icon} alt="close search bar icon" />
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default SearchBar;
