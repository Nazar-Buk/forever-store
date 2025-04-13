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
  const { backendUrl } = useContext(ShopContext);

  const [loadingState, setLoadingState] = useState({
    isLoadingBestsellers: true,
    isLoadingLatestProducts: true,
  });

  const [bestsellers, setBestsellers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const getBestsellers = async () => {
    try {
      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingBestsellers: true,
      }));

      const response = await axios.get(backendUrl + "/api/product/bestsellers");

      if (response.data.success) {
        setBestsellers(response.data.bestsellersForSection);

        setLoadingState((prevState) => ({
          ...prevState,
          isLoadingBestsellers: false,
        }));
      }

      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingBestsellers: false,
      }));
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response?.data?.message || "Something went wrong!");

      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingBestsellers: false,
      }));
    }
  };

  const getLatestProducts = async () => {
    try {
      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingLatestProducts: true,
      }));

      const response = await axios.get(
        backendUrl + "/api/product/latest-products"
      );

      if (response.data.success) {
        setLatestProducts(response.data.latestProductsForSection);

        setLoadingState((prevState) => ({
          ...prevState,
          isLoadingLatestProducts: false,
        }));
      }

      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingLatestProducts: false,
      }));
    } catch (error) {
      console.log(error, "error");
      toast.error(error.response?.data?.message || "Something went wrong!");

      setLoadingState((prevState) => ({
        ...prevState,
        isLoadingLatestProducts: false,
      }));
    }
  };

  useEffect(() => {
    getBestsellers();
    getLatestProducts();
  }, []);

  const isLoading =
    loadingState.isLoadingBestsellers || loadingState.isLoadingLatestProducts;

  return (
    <div className="home-page">
      {isLoading && <Loader />}
      <Hero />
      <LatestCollections latestProducts={latestProducts} />
      <BestSeller bestsellers={bestsellers} />
      <OurPolicy />
      <Newsletter />
    </div>
  );
};

export default Home;
