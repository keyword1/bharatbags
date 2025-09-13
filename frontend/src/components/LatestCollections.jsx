import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);
  return (
    <div className="my-10">
      <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
        <span className="font-light">Latest</span> Collection
      </h1>
      {/* rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => {
          return (
            <ProductItem
              key={item.product_id}
              id={item.product_id}
              image={item.images}
              name={item.title}
              oldPrice={item.old_price}
              price={item.new_price}
              stock={item.stock}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollections;
