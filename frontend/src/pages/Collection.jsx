import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import icons from "../assets/icons/icons";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("sort-by");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    if (!products || products.length === 0) return;
    let productCopy = products.slice();
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    setFilterProducts(productCopy);
  };

  const sortProducts = () => {
    if (!filterProducts || filterProducts.length === 0) return;
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.new_price - b.new_price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.new_price - a.new_price));
        break;
      default:
        applyFilter();
    }
  };
  useEffect(() => {
    if (products && products.length) {
      setFilterProducts(products);
    }
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category]);
  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center font-medium cursor-pointer gap-2"
        >
          FILTERS
          <>
            {icons.arrowBack_icon(
              `${showFilter ? "-rotate-90" : ""} w-4 h-4 sm:hidden`
            )}
          </>
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="text-light flex flex-col gap-3 text-sm text-gray-700">
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"School"}
                onChange={toggleCategory}
              />{" "}
              School Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Luggage"}
                onChange={toggleCategory}
              />{" "}
              Luggage Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Laptop"}
                onChange={toggleCategory}
              />{" "}
              Laptop Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Duffer"}
                onChange={toggleCategory}
              />{" "}
              Duffer Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Trekking"}
                onChange={toggleCategory}
              />{" "}
              Trekking Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Lunch"}
                onChange={toggleCategory}
              />{" "}
              Lunch Bags
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Pouch"}
                onChange={toggleCategory}
              />{" "}
              Pouches
            </p>
            <p className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4"
                value={"Caps"}
                onChange={toggleCategory}
              />{" "}
              Caps
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <p className=" my-2 text-3xl mt-3 lg:text-5xl flex font-medium">
            <span className="font-light mr-2">All</span> Collections
          </p>
          {/* porduct sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="h-8 border sm:border-2 border-gray-300 text-sm px-4 focus:outline-none "
          >
            <option value="sort-by">Sort-by</option>
            <option value="low-high">Low-high</option>
            <option value="high-low">High-low</option>
          </select>
        </div>
        {/* mapping products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => {
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
    </div>
  );
};

export default Collection;
