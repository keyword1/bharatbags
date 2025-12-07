import React, { useContext } from "react";
import { backendUrl } from "../../../admin/src/App";
import { ShopContext } from "../context/ShopContext";
const HeroBanner = () => {
  const { salesBanner, salesBannerSM } = useContext(ShopContext);
  console.log("sales banner: ", salesBanner);
  return (
    <div className="flex justify-center w-full bg-yellow-500  h-[20%] md:h-[40%] mt-0 overflow-hidden">
      {/* <img
        src={`${backendUrl}/admin_images/${salesBanner}`}
        alt=""
        srcSet={`${backendUrl}/admin_images/${banner2} 600w, ${backendUrl}/admin_images/${salesBanner} 1200w`}
        className="w-full h-auto object-cover"
      /> */}
      <picture>
        {/* mobile image */}
        <source
          media="(max-width: 768px)"
          srcSet={`${backendUrl}/admin_images/${salesBannerSM}`}
        />

        {/* desktop image */}
        <source
          media="(min-width: 769px)"
          srcSet={`${backendUrl}/admin_images/${salesBanner}`}
        />

        {/* fallback */}
        <img
          src={`${backendUrl}/admin_images/${salesBanner}`}
          alt=""
          className="w-full h-auto object-cover"
        />
      </picture>
    </div>
  );
};

export default HeroBanner;
