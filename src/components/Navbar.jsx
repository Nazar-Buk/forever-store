import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const cartTotalCount = getCartCount();

  const isOpenMobileMenu = (isOpen) => {
    isOpen
      ? (document.body.style.overflow = "hidden") // Забороняємо скролінг сайту
      : (document.body.style.overflow = ""); // Відновлюємо скролінг сайту
    setVisible(isOpen);
  };

  return (
    <header className="header__container">
      <div className="header__content">
        <Link to="/" className="header__logo">
          <img src={assets.logo} alt="logo" />
        </Link>
        <nav>
          <ul className="header__menu">
            <li>
              <NavLink to="/" className="menu__item">
                <p>HOME</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className="menu__item">
                <p>COLLECTION</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about-us" className="menu__item">
                <p>ABOUT</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="menu__item">
                <p>CONTACT</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__action-bar">
          <Link
            to="/collection"
            onClick={() => setShowSearch(true)}
            className="wrap-icon"
          >
            <img src={assets.search_icon} alt="search" />
          </Link>
          <div className="wrap-icon profile">
            <Link to="/login">
              <img src={assets.profile_icon} alt="profile-icon" />
            </Link>
            <div className="profile__menu">
              <p className="profile__item">My Profile</p>
              <p className="profile__item">Orders</p>
              <p className="profile__item">Logout</p>
            </div>
          </div>
          <Link to="/cart" className="wrap-icon cart-icon">
            <img src={assets.cart_icon} alt="shopping cart" />
            <p className={`${cartTotalCount && "active"}`}>{cartTotalCount}</p>
          </Link>
          <div
            onClick={() => isOpenMobileMenu(true)}
            className="wrap-icon mobile-icon"
          >
            <img src={assets.menu_icon} alt="menu icon" />
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        style={visible ? { display: "block" } : { display: "none" }}
        className="header__mobile-menu"
      >
        <div className="mobile-menu__close">
          <div
            onClick={() => isOpenMobileMenu(false)}
            className="wrap-close-btn"
          >
            <svg
              className="close-btn__arrow"
              aria-label="close mobile menu"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
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
            <p>Back</p>
          </div>
        </div>
        <div className="wrap-menu-content">
          <div className="header__mobile-logo">
            <img src={assets.logo} alt="logo" />
          </div>
          <nav>
            <ul onClick={() => isOpenMobileMenu(false)} className="mobile-menu">
              <li>
                <NavLink to="/" className="mobile-menu__item">
                  <p>HOME</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/collection" className="mobile-menu__item">
                  <p>COLLECTION</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className="mobile-menu__item">
                  <p>ABOUT</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="mobile-menu__item">
                  <p>CONTACT</p>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="mobile__action-bar">
            <div className="profile">
              <div
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="profile__icon-title-block"
              >
                <div className="wrap-icon ">
                  <img src={assets.profile_icon} alt="profile-icon" />
                </div>
                <p>PROFILE</p>

                <svg
                  className="profile__arrow"
                  style={
                    isProfileMenuOpen ? { transform: "rotate(270deg)" } : {}
                  }
                  aria-label="open/close profile menu"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 330 330"
                  xmlSpace="preserve"
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

              {isProfileMenuOpen && (
                <ul
                  onClick={() => isOpenMobileMenu(false)}
                  className="profile__menu"
                >
                  <Link>
                    <li className="profile__item">MY PROFILE</li>
                  </Link>
                  <Link>
                    <li className="profile__item">ORDERS</li>
                  </Link>
                  <Link>
                    <li className="profile__item">LOGOUT</li>
                  </Link>
                </ul>
              )}
            </div>
            <Link
              onClick={() => {
                setShowSearch(true);
                isOpenMobileMenu(false);
              }}
              to="/collection"
              className="search"
            >
              <div className="wrap-icon">
                <img src={assets.search_icon} alt="search" />
              </div>
              <p>SEARCH</p>
            </Link>

            <Link
              to="/cart"
              className="cart"
              onClick={() => isOpenMobileMenu(false)}
            >
              <div className="wrap-icon">
                <img src={assets.cart_icon} alt="shopping cart" />
                <p className={`${cartTotalCount && "active "} counter`}>
                  {cartTotalCount}
                </p>
              </div>
              <p className="cart__title">SHOPPING CART</p>
            </Link>
          </div>
        </div>
      </div>
      {/* end mobile menu */}
    </header>
  );
};

export default Header;
