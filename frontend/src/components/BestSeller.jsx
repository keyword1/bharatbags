import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      let arr = [];
      products.map((item) => {
        if (item.bestseller === true) {
          arr.push(item);
        }
      });
      setBestSeller(arr);
    }
  }, [products]);
  return (
    <div>
      <h1 className="text-3xl sm:py-3 lg:text-5xl">
        <span className="font-light">Best</span> Sellers
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => {
          return (
            <ProductItem
              key={item.product_id}
              id={item.product_id}
              image={item.images}
              name={item.title}
              oldPrice={item.old_price}
              price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
