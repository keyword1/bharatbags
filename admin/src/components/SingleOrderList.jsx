import React from "react";

const SingleOrderList = ({ orders }) => {
  return (
    <div className="mt-8">
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
                <p>{item.status}</p>
              </div>
              <div>
                <button className="text-sm border rounded-sm px-2 py-2 font-medium text-gray-500">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleOrderList;
