import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <LatestCollections />
      <BestSeller />
    </div>
  );
};

export default Home;
