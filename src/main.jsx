import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import App from "./App.jsx";
import About from "./pages/About.jsx";
import Collection from "./pages/Collection.jsx";
import Contact from "./pages/Contact.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import Orders from "./pages/Orders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Ой шось сталося!!!</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/collection",
        element: <Collection />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/place-order",
        element: <PlaceOrder />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <App />
  // </StrictMode>
  <RouterProvider router={router} fallbackElement={<>Loading...</>} />
);
