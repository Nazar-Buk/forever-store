import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import NetworkStatus from "./components/NetworkStatus";
import Loader from "./components/Loader";

import "./styles/main.scss";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const appWasLoaded = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", appWasLoaded); // Підписуємось на подію load

    return () => window.removeEventListener("load", appWasLoaded); // Очищаємо слухач події при демонтажі компонента
  }, []);

  return (
    <div>
      <NetworkStatus />
      {isLoading && <Loader />}
      {/* так підключив нотифікації до апки, а вже в конкретному випадку на сторінках використовуй toast*/}
      <ToastContainer position="top-center" autoClose={1800} />
      <Navbar />
      <SearchBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
