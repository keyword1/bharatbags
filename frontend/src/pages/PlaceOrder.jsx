import React, { useContext, useRef, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { logos } from "../assets/logos/Logo";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../../../admin/src/App";
import { UserContext } from "../context/UserContext";

const PlaceOrder = ({ setToken, setIsAuthenticated }) => {
  const { userDetails } = useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState("address1");
  // form state for address1
  const [address1, setAddress1] = useState({
    street: "",
    city: "",
    district: "",
    zip: "",
    state: "",
    phone: "",
  });

  const handleToggle = (value) => {
    setSelectedAddress((prev) => (prev === value ? "" : value));
  };

  console.log("user details: ", userDetails.address);
  const {
    cartItems,
    orderedItems,
    setCartItems,
    emptyCart,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  // TODO: get product price
  const submitOrder = async (cartItems, totalAmount, txnId, address) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("error: User not authorised");
      setToken("");
      setIsAuthenticated(false);
      emptyCart();
      return false;
    }
    try {
      totalAmount = totalAmount + delivery_fee;
      const response = await axios.post(
        backendUrl + "/api/order/place",
        {
          cartItems,
          totalAmount,
          txnId,
          address,
          orderedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Order placed:", response.data);
      setCartItems({});
      return true;
    } catch (error) {
      // ✅ Only remove token if it's an "Invalid token" 403 error
      if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.message === "Invalid token"
      ) {
        // localStorage.removeItem("token");
        setToken("");
        setIsAuthenticated(false);
        emptyCart();
        return false;
      }
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };
  // for (const item in cartItems) {
  //   console.log("item: ", item);
  //   console.log(cartItems[item]["qty"]);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop default refresh

    const finalAddress =
      selectedAddress === "address1" ? address1 : userDetails.address;

    const success = await submitOrder(
      cartItems,
      getCartAmount(),
      "payID:kkk253",
      JSON.stringify(finalAddress)
    );

    if (success) {
      navigate("/orders");
    } else {
      navigate("/login");
    }
  };
  const handleBack = () => {
    navigate("/cart");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[70vh] mt-16">
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          {/* Left side */}
          <input
            type="radio"
            name="selectedAddress"
            checked={selectedAddress === "address1"}
            onChange={() => handleToggle("address1")}
            className="mt-1 self-start"
          />
          <div className="text-xl sm:text-2xl">
            <Title first="Delivery" second="Information" />
          </div>

          <input
            className="border border-gray-300 rounded w-full px-1.5 py-1.5 text-sm"
            type="text"
            placeholder="street"
            value={address1.street}
            onChange={(e) =>
              setAddress1({ ...address1, street: e.target.value })
            }
            required={selectedAddress === "address1"}
          />
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded w-full px-1.5 py-1.5"
              type="text"
              placeholder="City"
              value={address1.city}
              onChange={(e) =>
                setAddress1({ ...address1, city: e.target.value })
              }
              required={selectedAddress === "address1"}
            />
            <input
              className="border border-gray-300 rounded w-full px-1.5 py-1.5"
              type="text"
              placeholder="District"
              value={address1.district}
              onChange={(e) =>
                setAddress1({ ...address1, district: e.target.value })
              }
              required={selectedAddress === "address1"}
            />
          </div>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded w-full px-1.5 py-1.5 [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              placeholder="Zip Code"
              value={address1.zip}
              onChange={(e) =>
                setAddress1({ ...address1, zip: e.target.value })
              }
              required={selectedAddress === "address1"}
            />
            <input
              className="border border-gray-300 rounded w-full px-1.5 py-1.5"
              type="text"
              placeholder="State"
              value={address1.state}
              onChange={(e) =>
                setAddress1({ ...address1, state: e.target.value })
              }
              required={selectedAddress === "address1"}
            />
          </div>
          <input
            className="border border-gray-300 rounded w-full px-1.5 py-1.5 [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
            type="Number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number"
            value={address1.phone}
            onChange={(e) =>
              setAddress1({ ...address1, phone: e.target.value })
            }
            required={selectedAddress === "address1"}
          />
        </div>
        {/* Middle */}
        {userDetails.address && userDetails.phone.length == 10 ? (
          <div className="flex flex-col">
            <input
              type="radio"
              name="selectedAddress"
              checked={selectedAddress === "address2"}
              onChange={() => handleToggle("address2")}
              className="mt-1 mb-2 self-start"
            />
            <p className="text-xl font-bold text-left">Address:</p>
            <p>{userDetails.address.street}</p>
            <p>{userDetails.address.city}(city)</p>
            <p>{userDetails.address.district}(District)</p>
            <p>Pincode: {userDetails.address.zip}</p>
          </div>
        ) : (
          <div>
            <p>No address saved</p>
            <p className="text-xs">
              Update your address & phone number in profile page
            </p>
          </div>
        )}
        {/* Right Side */}
        <div>
          <div className="min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            <div className=" flex justify-end w-full mt-8 text-end gap-3">
              <button
                type="button"
                onClick={() => handleBack()}
                className="bg-black text-white px-8 py-3 text-sm"
              >
                BACK
              </button>
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 text-sm"
              >
                PAY NOW{/* PLACE ORDER */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
