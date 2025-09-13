import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [visibleId, setVisibleId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`${backendUrl}/api/order/all-orders`);
      // console.log("FE orders: ", result.data.orders);
      // const items = JSON.parse(result.data.orders[0].item_qty);
      // console.log("FE order-items: ", items[0].status);
      const data = result.data.orders;
      if (data.length > 0) {
        setOrders(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between my-10">
        <p className="text-xl font-medium mb-5">All Orders</p>
      </div>
      <div className="text-sm hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr_1fr] items-center mb-4 gap-1">
        <b>Order Id</b>
        <b>Customer</b>
        <b>Email</b>
        <b>Phone Number</b>
        <b>Address</b>
        <b>Status</b>
        <b>Total</b>
      </div>
      <hr />
      {orders.map((item) => {
        {
          console.log("map: ", item.item_qty);
        }
        const items = item.item_qty;
        return (
          <div className="flex flex-col gap-2">
            <div className="text-sm hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr_1fr] items-center mb-4 justify-center gap-1">
              <div>
                <p
                  onClick={() => {
                    setVisibleId(visibleId == 0 ? item.order_id : 0);
                  }}
                  className="inline-block px-3 py-1 bg-slate-600 text-white cursor-pointer"
                >
                  {item.order_id}
                </p>
                <p></p>
              </div>
              <p>{item.first_name}</p>
              <p>{item.email}</p>
              <p>{item.phone_number}</p>
              <p>{item.address}</p>
              <select id="cars">
                <option value="ready">Ready to Ship</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <p>{item.total_payment}</p>
            </div>
            {/* <SingleOrderList orders={orders} />  */}
            {visibleId == item.order_id && (
              <div className="flex flex-col gap-2">
                <div className=" bg-slate-500 text-white text-sm hidden md:grid grid-cols-[1fr_0.5fr_3fr_1fr] items-center mb-1 justify-center gap-1 px-2">
                  <p>Image</p>
                  <p>Product Id</p>
                  <p>Title</p>
                  <p>Qty</p>
                </div>
                <div className=" bg-slate-200 text-black text-sm hidden md:grid grid-cols-[1fr_0.5fr_3fr_1fr] items-center mb-4 justify-center gap-1 px-2">
                  <p>Image</p>
                  <p>1023</p>
                  <p>Title</p>
                  <p>Qty</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
