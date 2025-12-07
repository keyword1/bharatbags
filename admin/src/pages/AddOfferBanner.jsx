import React from "react";
import { useState } from "react";
import { logos } from "../assets/Assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const AddOfferBanner = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image1 || !image2) {
      return toast.error("Please upload ALL banner images");
    }
    try {
      const formData = new FormData();

      formData.append("image1", image1);
      formData.append("image2", image2);
      const response = await axios.post(
        backendUrl + "/api/product/update-offer-banner",
        formData,
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-1 font-bold">Upload Offer Banners</p>

        <div className="flex gap-4 items-center justify-start">
          <label htmlFor="image1">
            <div className="flex-col items-center justify-center">
              <img
                className="w-20"
                src={!image1 ? logos.upload2 : URL.createObjectURL(image1)}
                alt=""
              />
              <p>PC</p>
            </div>
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              name="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <div className="flex-col items-center justify-center">
              <img
                className="w-20"
                src={!image2 ? logos.upload2 : URL.createObjectURL(image2)}
                alt=""
              />
              <p>Mobile</p>
            </div>
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              name="image2"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="flex gap-3"></div>

      <button
        className="px-3 py-2 bg-gray-600 text-white mt-3 rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default AddOfferBanner;
