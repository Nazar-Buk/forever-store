import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import OurPolicy from "../components/OurPolicy";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <LatestCollections />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
