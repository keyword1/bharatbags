import React, { useContext, useState } from "react";
import Hero from "../components/Hero";
import SaleBanner from "../components/SaleBanner";
import LatestCollections from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import ReviewModal from "../components/ReviewModal";
import ReviewBanner from "../components/ReviewBanner";
import JustCollections from "../components/JustCollections";
import { ShopContext } from "../context/ShopContext";
// import cron from "node-cron";
const Home = () => {
  // cron.schedule("*/10 * * * * *", async () => {
  //   console.log("Checking for expired reservations...");
  // });
  const { displayBanner, displayReview } = useContext(ShopContext);
  return (
    <div>
      <Hero />
      <LatestCollections />
      {displayBanner == 1 && <SaleBanner />}
      {displayReview == 1 && <ReviewBanner />}
      <JustCollections />
      {/* <BestSeller/> */}
      <OurPolicy />
    </div>
  );
};

export default Home;
