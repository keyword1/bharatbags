import React from "react";

const Hero = () => {
  const imageUrl = "http://localhost:3000/images/img1_c1_1.png";
  return (
    <div className="sm:flex items-center mt-4">
      <div className="flex items-center justify-center h-80 bg-white w-full">
        hello
        <img src={imageUrl} alt="" srcSet="" />
      </div>
      <div className="flex items-center justify-center h-80 bg-gray-600 w-full">
        hello
      </div>
    </div>
  );
};

export default Hero;
