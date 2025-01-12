import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

import "./styles/main.scss";

const App = () => {
  return (
    <div>
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
