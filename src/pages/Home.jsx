import { useContext } from "react";

import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import OurPolicy from "../components/OurPolicy";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { isLoading, setIsLoading } = useContext(ShopContext);
  return (
    <div className="home-page">
      {isLoading && <Loader />}
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
      <Newsletter />
    </div>
  );
};

export default Home;
