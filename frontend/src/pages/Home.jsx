import React, { useState } from "react";
import Hero from "../components/Hero";
import SaleBanner from "../components/SaleBanner";
import LatestCollections from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import ReviewModal from "../components/ReviewModal";
import ReviewBanner from "../components/ReviewBanner";
const Home = () => {
  return (
    <div>
      <Hero />
      <SaleBanner />
      <ReviewBanner />
      <LatestCollections />
      {/* <BestSeller/> */}
      <OurPolicy />
    </div>
  );
};

export default Home;
