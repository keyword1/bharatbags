import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, current_id }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter(
        (item) => category === item.category && current_id !== item.id
      );
      setRelated(productCopy.slice(0, 10));
    }
  }, [products]);
  return (
    <div className="mt-20">
      {/* <h1 className="text-3xl font-medium mb-5">Related Products</h1> */}
      <Title first="Related" second="Products" />
      {/* mapping products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem
            key={item.product_id}
            id={item.product_id}
            image={item.images}
            name={item.title}
            oldPrice={item.old_price}
            price={item.new_price}
            stock={item.stock}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
