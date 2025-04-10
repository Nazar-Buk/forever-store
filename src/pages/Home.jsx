import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import OurPolicy from "../components/OurPolicy";
import Newsletter from "../components/Newsletter";
import Loader from "../components/Loader";
import { ShopContext } from "../context/ShopContext";

const Home = () => {
  const { isLoading, setIsLoading, backendUrl } = useContext(ShopContext);
  const [products, setProducts] = useState([]);

  const getProductsData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setIsLoading(false);

        setProducts(response.data.products);
        toast.success(response.data.message);
      } else {
        setIsLoading(false);

        toast.error(response.data.message);
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error, "error");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  return (
    <div className="home-page">
      {isLoading && <Loader />}
      <Hero />
      <LatestCollections products={products} />
      <BestSeller products={products} />
      <OurPolicy products={products} />
      <Newsletter products={products} />
    </div>
  );
};

export default Home;
