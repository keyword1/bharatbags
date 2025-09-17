import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import icons from "../assets/icons/icons";
import { backendUrl } from "../../../admin/src/App";

const ProductItem = ({ id, image, name, oldPrice, price, stock }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const arr = JSON.parse(image);
  return (
    <div className="curson-pointer text-gray-700">
      <Link
        className="overflow-hidden bg-[var(--light-ash)] rounded-md block"
        to={`/product/${id}`}
      >
        <img
          className="hover:scale-110 transition ease-in-out"
          // src={image[0]}
          src={`${backendUrl}/images/${arr[0]}`}
          alt=""
        />
      </Link>
      <Link to={`/product/${id}`}>
        <p className="pt-3 pb-1 text-sm font-medium mb-5">{name}</p>
      </Link>
      {stock > 0 ? (
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-sm font-medium pr-2">
              {currency}
              {price}
            </p>
            <p className="line-through text-sm font-medium text-gray-400">
              {parseInt(oldPrice) <= 0 ? "" : currency + " " + oldPrice}
            </p>
          </div>
          <div>
            <button onClick={() => addToCart(id, "qty", name, arr[0], price)}>
              {icons.cart("text-gray-500 group-hover:fill-black")}
            </button>{" "}
          </div>
        </div>
      ) : (
        <p>
          <b>Out of Stock</b>
        </p>
      )}
    </div>
  );
};

export default ProductItem;
