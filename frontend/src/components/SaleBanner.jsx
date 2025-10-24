import React, { useContext } from "react";
import { backendUrl } from "../../../admin/src/App";
import { ShopContext } from "../context/ShopContext";
const SaleBanner = () => {
  const { salesBanner } = useContext(ShopContext);
  return (
    <div className="flex justify-center w-full bg-yellow-500  h-[20%] md:h-[40%] mt-5 overflow-hidden">
      <img
        src={`${backendUrl}/admin_images/${salesBanner}`}
        alt=""
        srcSet=""
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default SaleBanner;
