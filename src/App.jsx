import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

import "./styles/main.scss";

const App = () => {
  return (
    <div>
      {/* так підключив нотифікації до апки, а вже в конкретному випадку на сторінках використовуй toast*/}
      <ToastContainer />
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
