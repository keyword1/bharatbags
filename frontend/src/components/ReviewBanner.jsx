import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";
import { X, Star } from "lucide-react";
import { backendUrl } from "../../../admin/src/App";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ReviewModal from "./ReviewModal";

const ReviewBanner = () => {
  const { products, currency } = useContext(ShopContext);
  const { userDetails } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(true);
  const [popUp, setPopUp] = useState(null); //based on productId
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (token && products.length > 0) {
      try {
        const decode = jwtDecode(token);
        const userId = decode.id;
        const result = await axios.post(
          `${backendUrl}/api/order/user-orders-history`,
          {
            userId,
          }
        );
        const data = result.data.orders;
        console.log("orders-data: ", data);
        const new_data = [];
        data.map((item) => {
          const order_item = JSON.parse(item.item_qty);
          console.log("order_item ", order_item);
          order_item.map((item2) => {
            //item2={id:1, title:"abc", qty:2, etc}
            // console.log("orders-item, each item : ", item.order_id);
            !item2.review_tf &&
              new_data.push({
                ...item2,
                status_m: item.status_m,
                order_id: item.order_id,
              });
          });
        });
        setOrders(new_data);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, [products]);
  if (!visible) return null;
  return (
    <div className=" relative w-full mt-4">
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <X size={18} />
      </button>
      <h2 className="text-lg font-semibold mb-1">
        How was your experience with recent purchasezzzz?
      </h2>
      <div className="flex gap-4">
        {orders.map((item, index) => {
          const images = item.image;
          return (
            <div key={index} className="flex flex-col items-center gap-1">
              <img
                className="w-24 h-24 sm:w-48 sm:h-48 bg-slate-50 rounded-md"
                src={`${backendUrl}/images/${images}`}
              />
              {/* <div className="text-sm">{item.title}</div> */}
              <button
                onClick={() => setPopUp(item.id)}
                className="bg-blue-700 rounded-md py-2 w-[65%] justify-center text-white"
              >
                Review
              </button>
              <ReviewModal
                isOpen={popUp === item.id}
                onClose={() => setPopUp(null)}
                userId={userDetails.id}
                userName={userDetails.name}
                productId={item.id}
                orderId={item.order_id}
                onReviewSubmitted={fetchData}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewBanner;
