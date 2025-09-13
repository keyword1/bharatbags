import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { backendUrl } from "../../../admin/src/App";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const History = () => {
  const { products, currency } = useContext(ShopContext);
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  // orderDate is for formatting the date that comes from DB
  const orderDate = (a) => {
    const formattedDate = new Date(a).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  useEffect(() => {
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
            order_item.map((item2) => {
              //item2={id:1, title:"abc", qty:2, etc}
              // console.log("orders-item: ", item2.title);
              new_data.push({
                ...item2,
                order_date: orderDate(item.created_at),
                status_m: item.status_m,
              });
            });
          });
          setOrders(new_data);
        } catch (error) {
          console.error("Invalid token", error);
        }
      }
    };
    fetchData();
  }, [products]);
  useEffect(() => {
    console.log("Admin Updated orders:", orders);
  }, [orders]);

  return (
    <div className="mt-8">
      <div className="text-xl">
        <Title first=" My Order" second="History" />
      </div>
      {orders.map((item, index) => {
        {
          /* const images = JSON.parse(item.images); */
        }
        const images = item.image;
        return (
          <div key={index} className="flex border-t py-4 text-sm">
            <img
              className="w-16 h-16 sm:w-24 sm:h-24"
              src={`${backendUrl}/images/${images}`}
              srcSet=""
            />
            <div className="flex w-full flex-col gap-2 sm:justify-between sm:flex-row sm:items-center">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-2">
                  <div>{item.title}</div>
                  <div className="flex gap-2">
                    <div>
                      {currency}
                      {item.price}
                    </div>
                    <div className="flex gap-2">
                      <p>Qty: </p>
                      <p>{item.qty}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <p>Date:</p>
                    <p className="text-gray-500">{item.order_date}</p>{" "}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p>{item.status_m}</p>
              </div>
              <div>
                <button className="text-sm border rounded-sm px-2 py-2 font-medium text-gray-500">
                  Review
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
