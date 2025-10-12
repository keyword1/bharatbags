import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";
import icons from "../assets/icons/icons";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { backendUrl } from "../App";
import axios from "axios";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateCart,
    navigate,
    setOrderedItems,
  } = useContext(ShopContext);
  const { userDetails } = useContext(UserContext);

  const [cartData, setCartData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        if (!userDetails?.id) return; // prevent API call if user not loaded

        const tempData = [];

        for (const itemId in cartItems) {
          if (itemId === "total") continue;

          const userId = userDetails.id;
          const productId = itemId;
          const result = await axios.post(
            `${backendUrl}/api/order/user-review`,
            { userId, productId }
          );
          const { reviewed } = result.data;
          console.log("user review result: ", reviewed);

          tempData.push({
            id: itemId,
            qty: cartItems[itemId]?.qty || 1,
            title: cartItems[itemId]?.title || "",
            image: cartItems[itemId]?.image || "",
            price: cartItems[itemId]?.price || 0,
            status: cartItems[itemId]?.status || "",
            review_tf: reviewed,
          });
        }

        setCartData(tempData);
      } catch (error) {
        console.error("Error fetching user review:", error);
      }
    };

    fetchUserReview();
  }, [cartItems, userDetails]);

  //checking the INVENTORY
  const handlePlaceOrder = async () => {
    console.log("cart data me: ", userDetails.id);
    const result = await axios.post(
      `${backendUrl}/api/order/check-stock`,
      { cartData, user_id: userDetails.id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("result; ", result.data.success);
    if (result.data.success) {
      setOrderedItems(cartData);
      return navigate("/place-order");
    } else {
    }
  };

  return (
    <div className="border-t pt-14">
      <Title first="Your" second="Cart" />
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product.product_id == item.id
          );
          const images = JSON.parse(productData.images);
          return (
            <div
              key={item.id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex float-start gap-6 items-center">
                <img
                  src={`${backendUrl}/images/${images[0]}`}
                  alt=""
                  srcset=""
                  className="w-16 sm:w-20"
                />
                <div className="text-gray-500">
                  <p>{productData.title}</p>
                  <p className="font-medium">
                    {currency}
                    {productData.new_price}
                  </p>
                </div>
                {/*  */}
              </div>
              {/*onKeyDown={(e) => e.preventDefault()}*/}
              <div className="flex gap-4 justify-start">
                <p className="font-medium">Qty</p>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateCart(item.id, Number(e.target.value))
                  }
                  type="number"
                  min={1}
                  defaultValue={item.qty}
                  className="max-w-12 sm:max-w-24 text-center border"
                />
              </div>
              <div
                onClick={() => updateCart(item.id, 0)}
                className="cursor-pointer"
              >
                {icons.delete_icon("delete")}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            {cartData.length > 0 && (
              <button
                onClick={handlePlaceOrder}
                className="py-4 px-8 my-8 bg-black text-white"
              >
                PLACE ORDER{/* PROCEED TO CHECKOUT */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
