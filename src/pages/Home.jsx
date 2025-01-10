import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import OurPolicy from "../components/OurPolicy";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
      <Newsletter />
    </div>
  );
};

export default Home;
