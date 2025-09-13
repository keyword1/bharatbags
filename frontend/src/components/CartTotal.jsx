import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <p>
          <span className="font-light mr-3">Cart</span>
          <span className="font-medium">Total</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>

        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {getCartAmount() > 0 ? delivery_fee + ".00" : 0}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() == 0 ? 0 : getCartAmount() + Number(delivery_fee)}
            .00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
