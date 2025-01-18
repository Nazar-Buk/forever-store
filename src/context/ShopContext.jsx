import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { products } from "../assets/assets";

export const ShopContext = createContext(); // створюємо контекст

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const currency = "$";
  const delivery_fee = 10; // вартість доставки

  const addToCart = async (itemId, size) => {
    if (!size) {
      // тут використовується !size, бо я хочу щоб іф виконався коли прийшла пуста стрічка,
      // як би було просто size, то не показувалося б повідомлення та не зупинялася фн addToCart
      toast.error("Choose size");

      return; // зупиняє фн addToCart
    }

    let cartData = structuredClone(cartItems); // так робиться глибока копія об`єкта, без зміни оригіналу.

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // додаємо кількість товарів конкретного розміру
      } else {
        cartData[itemId][size] = 1; // додаємо товар нового розміру
      }
    } else {
      cartData[itemId] = {}; // додаємо новий запис (товар)
      cartData[itemId][size] = 1; // додаємо новий розмір до щойно зробленого товару
    }

    // КОЖНІ КВАДРАТНІ ДУЖКИ ЦЕ ЯК КЛЮЧ ОБ'ЄКТА, ПІСЛЯ НИХ МОЖНА СТАВИТИ : (умовно)

    ////////////////// отримаємо щось таке
    // {
    //   101: { S: 2, M: 1 }, // Товар із id 101 має 2 розміри S та 1 розмір M
    //   102: { L: 3 }        // Товар із id 102 має 3 розміри L
    // }
    //////////////////

    //////////////////
    // ось структура коли є ще кольори
    // cartData[itemId][color][size]
    // addToCart(101, "blue", "L");
    // Результат:
    // cartItems = {
    //   101: {
    //     red: {
    //       M: 2,
    //       S: 1
    //     },
    //     blue: {
    //       L: 1
    //     }
    //   }
    // };
    //////////////////

    setCartItems(cartData);
  };
  //////////////////////////////////////////////////

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      // бігаємо по найстаршому по ієрархії об'єкту,  items -- об'єкт який в середині (в даному випадку це id  продукта)
      for (const item in cartItems[items]) {
        // проходжуся по об'єкту що нижче по ієрархії,  cartItems[items] -- пробігаю по об'єкту ключом якого є id  продукта;
        // item -- конкретний об'єкт що є на кожній ітерації

        try {
          if (cartItems[items][item] > 0) {
            // cartItems[items][item] -- кількість товарів даного розміру,
            // саме їх ми і бужемо рахувати, щоб дізнатися скільки одиниць товарів у нас буде
            totalCount = totalCount + cartItems[items][item];
          }
        } catch (error) {}
      }
    }

    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    // if (quantity === "" || quantity < 1) {

    // }

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const removeAllCartProducts = () => {
    setCartItems({});
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    removeAllCartProducts,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
