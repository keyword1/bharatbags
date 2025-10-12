import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [visibleId, setVisibleId] = useState(null);
  const [option, setOption] = useState({});
  const [selectinStat, setSelectionStat] = useState({});
  const [updateBtn, setUpdateBtn] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(`${backendUrl}/api/order/all-orders`);
      const data = result.data.orders || [];
      if (data.length > 0) {
        setOrders(data);
      }
    };
    fetchData();
  }, []);
  const handleChange = (order_id, status) => {
    setSelectionStat((prev) => ({ ...prev, [order_id]: status }));
    setOption({ order_id: order_id, status: status });
  };
  useEffect(() => {
    setUpdateBtn(option);
  }, [option]);
  const handleUpdate = async (order_id, status_m) => {
    let result = null;
    try {
      if (status_m == "Delivered") {
        result = await axios.post(`${backendUrl}/api/order/move-to-history`, {
          order_id,
          status_m,
        });
      } else {
        result = await axios.post(`${backendUrl}/api/order/update-status`, {
          order_id,
          status_m,
        });
      }

      if (result.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.order_id === order_id ? { ...o, status_m } : o
          )
        );
      }
      // setUpdateBtn({});
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <div>
      <div className="flex justify-between my-10">
        <p className="text-xl font-medium mb-5">All Orders</p>
      </div>
      <div className="text-sm hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr_1fr_1fr] items-center mb-4 gap-1">
        <b>Order Id</b>
        <b>Customer</b>
        <b>Email</b>
        <b>Phone Number</b>
        <b>Address</b>
        <b>Status</b>
        <b>Total</b>
        <b>Txn Id</b>
      </div>
      <hr />
      {Array.isArray(orders) &&
        orders.map((item) => {
          const address = JSON.parse(item.address);

          {
            /* {
            console.log("map: ", item.item_qty);
          } */
          }
          const items = JSON.parse(item.item_qty);
          return (
            <div className="flex flex-col gap-2 ">
              <div className="text-sm hidden md:grid grid-cols-[1fr_1fr_1fr_1fr_2fr_1fr_1fr_1fr] items-center mt-2 justify-center gap-1 bg-slate-100">
                <div>
                  <p
                    onClick={() => {
                      setVisibleId(
                        visibleId == item.order_id ? null : item.order_id
                      );
                    }}
                    className="inline-block px-3 py-1 bg-slate-600 text-white cursor-pointer select-none"
                  >
                    {item.order_id}
                  </p>
                  <p></p> {/* blank p is to keep order_id's BG limited */}
                </div>
                <p>{item.first_name}</p>
                <p>{item.email}</p>
                <p>{item.phone_number}</p>
                <div className="text-[12px] flex flex-col">
                  <p>{address.street}</p>
                  <div className="flex gap-1">
                    <p>
                      <b>city</b>: {address.city},{" "}
                    </p>
                    <p>
                      <b>Pincode</b>:{address.zip}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <p>
                      <b>District</b>:{address.district},{" "}
                    </p>
                    <p>
                      <b>state</b>:{address.state}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Phone</b>: {address.phone ? address.phone : "0"}
                    </p>
                  </div>
                </div>

                <select
                  id="cars"
                  className="w-[50%]"
                  value={selectinStat[item.order_id] ?? item.status_m} // ready to ship from status_m?
                  onChange={(e) => {
                    handleChange(item.order_id, e.target.value);
                  }}
                >
                  <option value="Ready to Ship">Ready to Ship</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <p>{item.total_payment}</p>
                <p>{item.transaction_id}</p>
              </div>
              {/* <SingleOrderList orders={orders} />  */}
              {visibleId == item.order_id && (
                <div className="flex flex-col gap-2 bg-slate-100">
                  <div className=" bg-slate-300 text-black text-sm hidden md:grid grid-cols-[0.25fr_0.5fr_1.5fr_1fr_1fr_4fr] items-center justify-center gap-1 px-2">
                    <p>Id</p>
                    <p>image</p>

                    <p>Title</p>
                    <p>price</p>
                    <p>Qty</p>
                  </div>
                  {items.map((i) => {
                    return (
                      <div className=" text-black text-sm hidden md:grid grid-cols-[0.25fr_0.5fr_1.5fr_1fr_1fr_4fr] items-center justify-center gap-1 px-2">
                        <p>{i.id}</p>
                        <img
                          className="w-8 h-8 sm:w-12 sm:h-12"
                          src={`${backendUrl}/images/${i.image}`}
                          srcSet=""
                        />

                        <p>{i.title}</p>
                        <p>{i.price}</p>
                        <p>{i.qty}</p>
                      </div>
                    );
                  })}
                  <div className="flex gap-3 justify-center mb-2">
                    {updateBtn.order_id == item.order_id ? (
                      <button
                        onClick={() => {
                          handleUpdate(updateBtn.order_id, updateBtn.status);
                          setUpdateBtn({});
                        }}
                        className="bg-green-600 px-2 py-1 rounded-md text-white"
                      >
                        Update
                      </button>
                    ) : (
                      <button className="bg-gray-600 px-2 py-1 rounded-md text-gray-400">
                        Update
                      </button>
                    )}
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
