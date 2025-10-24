import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Dashboard = ({ token }) => {
  const [disBanner, setDisBanner] = useState(false);
  const [disReview, setDisReview] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      backendUrl + "/api/product/list-admin-dashboard"
    );
    const data = response.data.result[0];
    console.log("response: ", data[0].dis_banner_tf);
    if (response.data.success) {
      const data = response.data.result[0][0];
      // console.log("dashboard data: ", data[0]);
      console.log(typeof data.dis_banner_tf);
      setDisBanner(data.dis_banner_tf === 1);
      setDisReview(data.dis_review_banner_tf === 1);
      setDeliveryFee(data.delivery_fee);
      // console.log("results: ", disBanner, disReview);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("true or false: ", disBanner, disReview);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("entered here");
    try {
      const response = await axios.post(
        backendUrl + "/api/product/update-admin-dashboard",
        { disBanner, disReview, deliveryFee },
        { headers: { token } }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
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
      <div className="flex gap-2">
        <input
          onChange={(e) => setDisBanner(e.target.checked)}
          type="checkbox"
          name="banner-check"
          id=""
          checked={disBanner}
        />
        <label for="vehicle1"> Display banner</label>
        <br></br>
      </div>
      <div className="flex gap-2">
        <input
          onChange={(e) => setDisReview(e.target.checked)}
          type="checkbox"
          name="review-banner-check"
          id=""
          checked={disReview}
        />
        <label for="vehicle1"> Display Review Banner</label>
        <br></br>
      </div>
      <div className="flex gap-2">
        <label for="vehicle1"> Delivery Fee : </label>
        <input
          onChange={(e) => setDeliveryFee(e.target.value)}
          type="number"
          name="review-banner-check"
          id=""
          value={deliveryFee}
          className="border"
        />

        <br></br>
      </div>
      <button
        className="px-3 py-2 bg-gray-600 text-white mt-3 rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default Dashboard;
