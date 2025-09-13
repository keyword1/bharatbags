import React, { useEffect, useState } from "react";
import { logos } from "../assets/Assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { useParams } from "react-router-dom";

const Edit = ({ token }) => {
  const { product_id } = useParams();
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const fetchData = async () => {
    const response = await axios.post(backendUrl + "/api/product/single", {
      productId: product_id,
    });
    if (response.data.success) {
      const data = response.data.datas;
      const imgArr = JSON.parse(data.images);
      //   console.log(JSON.parse(data.images));
      setTitle(data.title);
      setDetails(data.details);
      setPrice(data.new_price);
      setOldPrice(data.old_price);
      setCategory(data.category);
      setStock(data.stock);
      setImage1(imgArr[0]);
      setImage2(imgArr[1]);
      setImage3(imgArr[2]);
      setImage4(imgArr[3]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image1 || !image2 || !image3 || !image4) {
      return toast.error("Please upload all 4 images");
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("details", details);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("oldPrice", oldPrice);
      formData.append("productId", product_id);
      formData.append("stock", stock);
      // Check if image is a File (new upload) or a string (existing filename)
      //   formData.append("image1", image1);
      //   formData.append("image2", image2);
      //   formData.append("image3", image3);
      //   formData.append("image4", image4);
      if (typeof image1 === "string") {
        formData.append(`image1Name`, image1); // existing filename
      } else {
        formData.append(`image1`, image1); // new file upload
      }
      if (typeof image2 === "string") {
        formData.append(`image2Name`, image2); // existing filename
      } else {
        formData.append(`image2`, image2); // new file upload
      }
      if (typeof image3 === "string") {
        formData.append(`image3Name`, image3); // existing filename
      } else {
        formData.append(`image3`, image3); // new file upload
      }
      if (typeof image4 === "string") {
        formData.append(`image4Name`, image4); // existing filename
      } else {
        formData.append(`image4`, image4); // new file upload
      }

      const response = await axios.post(
        backendUrl + "/api/product/edit",
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setCategory("");
        setDetails("");
        setTitle("");
        setPrice(0);
        setOldPrice(0);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setStock(0);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("me" + error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <p className="text-xl font-medium mb-5">Update Product</p>
      <div>
        <p className="mb-1">Upload Images</p>
        <div className="flex gap-2 items-center justify-start">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={
                !image1
                  ? logos.upload2
                  : typeof image1 === "string"
                  ? `${backendUrl}/images/${image1}`
                  : URL.createObjectURL(image1)
              }
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              name="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={
                !image2
                  ? logos.upload2
                  : typeof image2 === "string"
                  ? `${backendUrl}/images/${image2}`
                  : URL.createObjectURL(image2)
              }
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              name="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={
                !image3
                  ? logos.upload2
                  : typeof image3 === "string"
                  ? `${backendUrl}/images/${image3}`
                  : URL.createObjectURL(image3)
              }
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              name="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={
                !image4
                  ? logos.upload2
                  : typeof image4 === "string"
                  ? `${backendUrl}/images/${image4}`
                  : URL.createObjectURL(image4)
              }
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              name="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full mt-3">
        <p className="mb-1">Product Name</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full mt-3">
        <p className="mb-1">Product Details</p>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          type="text-area"
          placeholder="Details here"
          required
        />
      </div>
      <div>
        <p className="mb-1">Product Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          required
          className="px-3 py-2 w-full outline-none border border-gray-300"
        >
          <option value="">Select</option>
          <option value="School">School Bags</option>
          <option value="Luggage">Luggage Bags</option>
          <option value="Laptop">Laptop Bags</option>
          <option value="Duffer">Duffer Bags</option>
          <option value="Trekking">Trekking Bags</option>
          <option value="Lunch">Lunch Bags</option>
          <option value="Pouches">Pouches</option>
          <option value="Caps">Caps</option>
        </select>
      </div>
      <div className="flex gap-3">
        <div className="mt-3">
          <p className="mb-1">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            required
            min="0"
            className="px-2 py-2 no-spinners border border-gray-300 outline-none"
          />
        </div>
        <div className="mt-3">
          <p className="mb-1">Old Price</p>
          <input
            onChange={(e) => setOldPrice(e.target.value)}
            value={oldPrice}
            type="number"
            required
            min="0"
            className="px-2 py-2 no-spinners border border-gray-300 outline-none"
          />
        </div>
      </div>
      <div className="mt-3">
        <p className="mb-1">Stock</p>
        <input
          onChange={(e) => setStock(e.target.value)}
          value={stock}
          type="number"
          required
          min="0"
          className="px-2 py-2 no-spinners border border-gray-300 outline-none"
        />
      </div>
      <button
        className="px-3 py-2 bg-gray-600 text-white mt-3 rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default Edit;
