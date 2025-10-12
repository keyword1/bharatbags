import React from "react";
import FeatureCards from "./FeatureCards";
import { backendUrl } from "../../../admin/src/App";

const Hero = () => {
  const imageUrl = "http://localhost:3000/images/img1_c1_1.png";
  const video_ID = "7wkegMNum4s"; //SOGOzpYmNV4
  return (
    <div className="flex flex-col md:flex-row items-center mt-4">
      <div className="flex items-center justify-center bg-white w-full">
        <FeatureCards />
        <img src={imageUrl} alt="" srcSet="" />
      </div>
      <div className="relative flex items-center justify-center h-80 bg-gray-600 w-full">
        <iframe
          className="top-0 left-0 w-[177.78%] h-full -left-[38.89%]"
          src={`https://www.youtube.com/embed/${video_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video_ID}&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1`}
          title="YouTube video"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
        {/* <video
          src={`${backendUrl}/admin_images/IMG_5020.mp4`}
          autoPlay
          muted
          loop
          className="h-[100%]"
        > */}
        {/* Transparent overlay to block interactions */}
        <div className="absolute inset-0 bg-transparent "></div>
      </div>
    </div>
  );
};

export default Hero;
