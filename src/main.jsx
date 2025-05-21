import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import App from "./App.jsx";
// import ShopContextProvider from "./context/ShopContext.jsx";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import MainLayout from "../src/layouts/MainLayout.jsx";
import About from "./pages/About.jsx";
import Collection from "./pages/Collection.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";
import Error from "./pages/Error.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      // Увага: усі дочірні маршрути в children — без початкового /! (React Router автоматично їх об’єднує з батьківським path)
      // children: [
      //   {
      //     index: true,
      //     element: <Home />,
      //   },
      //   {
      //     path: "/collection",
      //     element: <Collection />,
      //   },
      //   {
      //     path: "/about-us",
      //     element: <About />,
      //   },
      //   {
      //     path: "/contact",
      //     element: <Contact />,
      //   },
      //   {
      //     path: "/product/:productId", // напиши норм назву бо потім будеш productId використовувати
      //     element: <Product />,
      //   },
      //   {
      //     path: "/cart",
      //     element: <Cart />,
      //   },
      //   // {
      //   //   path: "/login",
      //   //   element: <Login />,
      //   // },
      //   {
      //     path: "/place-order",
      //     element: <PlaceOrder />,
      //   },
      //   {
      //     path: "/orders",
      //     element: <Orders />,
      //   },
      // ],
      // якщо є path -- то index:true;  не потрібен
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "collection",
              element: <Collection />,
            },
            {
              path: "about-us",
              element: <About />,
            },
            {
              path: "contact",
              element: <Contact />,
            },
            {
              path: "product/:productId", // напиши норм назву бо потім будеш productId використовувати
              element: <Product />,
            },
            {
              path: "cart",
              element: <Cart />,
            },

            {
              path: "place-order",
              element: <PlaceOrder />,
            },
            {
              path: "orders",
              element: <Orders />,
            },
          ],
        },
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
  ],
  {
    basename: import.meta.env.BASE_URL, // реакт сам знає що це тягнеться із файлу vite.config.js
  }
);

window.addEventListener("load", () => {
  // load -- працює тоді коли сторінка повністю завантажена,
  // ховаємо лоадер

  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <App />
  // </StrictMode>
  /////////////////////////

  // <ShopContextProvider>
  //  {/* так підключив нотифікації до апки, а вже в конкретному випадку на сторінках використовуй toast*/}
  // <>
  /* <ToastContainer position="top-center" autoClose={1800} /> */
  <RouterProvider router={router} fallbackElement={<>Loading...</>} />
  /* </> */
  //  </ShopContextProvider>
);
