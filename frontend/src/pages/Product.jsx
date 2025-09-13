import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import icons from "../assets/icons/icons";
import RelatedProducts from "../components/RelatedProducts";
import { backendUrl } from "../App";
import RatingSlider from "../components/RatingSlider";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const fetchProductData = async () => {
    products.map((item) => {
      if (item.product_id === Number(productId)) {
        setProductData(item);
        const arr = JSON.parse(item.images);
        setImage(arr[0]);
        setImages(arr);
        return null;
      }
    });
  };
  const handleRatingChange = (val) => {
    console.log("User rating:", val);
  };
  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    }
  }, [productId, products]);

  useEffect(() => {}, [productData]);
  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100 w-full xl:w-[70%] xl:mx-56">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex flex-1 flex-col gap-3">
          <img
            className="border-2"
            src={`${backendUrl}/images/${image}`}
            alt=""
            srcset=""
          />
          <div className="flex flex-row w-[100%] justify-between">
            <img
              onClick={() => {
                setImage(images[0]);
              }}
              className="w-[20%] bg-[var(--light-ash)] rounded-sm cursor-pointer"
              src={`${backendUrl}/images/${images[0]}`}
              alt=""
            />
            <img
              onClick={() => {
                setImage(images[1]);
              }}
              className="w-[20%] bg-[var(--light-ash)] rounded-sm cursor-pointer"
              src={`${backendUrl}/images/${images[1]}`}
              alt=""
            />
            <img
              onClick={() => {
                setImage(images[2]);
              }}
              className="w-[20%] bg-[var(--light-ash)] rounded-sm cursor-pointer"
              src={`${backendUrl}/images/${images[2]}`}
              alt=""
            />
            <img
              onClick={() => {
                setImage(images[3]);
              }}
              className="w-[20%] bg-[var(--light-ash)] rounded-sm cursor-pointer"
              src={`${backendUrl}/images/${images[3]}`}
              alt=""
            />
          </div>
        </div>
        {/* product details */}
        <div className="flex flex-1 flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-medium">
            {productData.title}
          </h1>
          {/* rating stars */}
          <div className="flex items-center">
            <>{icons.star_icon("fill-[var(--yellow)]")}</>
            <>{icons.star_icon("fill-[var(--yellow)]")}</>
            <>{icons.star_icon("fill-[var(--yellow)]")}</>
            <>{icons.star_icon("fill-[var(--yellow)]")}</>
            <>{icons.star_half_icon("fill-[var(--yellow)]")}</>
            <>{icons.star_empty_icon("fill-[var(--yellow)] hidden")}</>
            <p>(122)</p>
          </div>
          <div className="flex gap-3">
            <h1 className="text-2xl sm:text-4xl sm:font-medium ">
              {currency}
              {productData.new_price}
            </h1>
            <h1 className="text-2xl sm:text-4xl sm:font-medium line-through text-gray-300">
              {productData.old_price <= 0
                ? ""
                : currency + "" + productData.old_price}
              {/* {currency}
              {productData.old_price} */}
            </h1>
          </div>
          <p>{productData.details}</p>
          {productData.stock > 0 ? (
            <button
              onClick={() =>
                addToCart(
                  productData.product_id,
                  "qty",
                  productData.title,
                  image,
                  productData.old_price
                )
              }
              className="bg-black text-white py-4 w-1/2 active:bg-slate-800"
              type="submit"
            >
              ADD TO CART
            </button>
          ) : (
            <p className="text-3xl font-bold mt-10">Out of Stock</p>
          )}
        </div>
      </div>
      {/* related products */}
      <RelatedProducts
        category={productData.category}
        current_id={productData.product_id}
      />
      <div className="mt-20">
        <div>
          <RatingSlider onChange={handleRatingChange} />
        </div>

        {/* Review section */}
        <div className="flex">
          <p className="px-5 py-3 border text-sm">Reviews(122)</p>
        </div>
        <hr />
        <div className="flex flex-col mt-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="rounded-full px-5 py-5 bg-gray-500"></div>
            <div>
              <p className="text-base font-medium">Harshad Paramar</p>
              <div className="flex">
                <>{icons.star_icon("fill-[var(--yellow)] h-6 w-6")}</>
                <>{icons.star_icon("fill-[var(--yellow)] h-6 w-6")}</>
                <>{icons.star_icon("fill-[var(--yellow)] h-6 w-6")}</>
                <>{icons.star_icon("fill-[var(--yellow)] h-6 w-6")}</>
                <>{icons.star_half_icon("fill-[var(--yellow)] h-6 w-6")}</>
              </div>
            </div>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa ex
            praesentium facilis pariatur sapiente beatae in! Omnis debitis
            corporis quaerat temporibus! Ducimus, repellat repellendus facere
            eligendi molestiae non. Quae, distinctio.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
