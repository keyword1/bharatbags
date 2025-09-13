import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import { logos } from "../assets/Assets";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [category, setCategory] = useState("");
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      const items = response.data.result[0];
      // console.log(response);

      if (response.data.success) {
        if (category == "") {
          setList(items);
        } else {
          const temp = items.filter((item) => item.category == category);
          setList(temp);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    await axios.post(
      backendUrl + "/api/product/remove",
      { id },
      { headers: { token } }
    );
    fetchList();
  };
  useEffect(() => {
    fetchList();
  }, [category]);

  return (
    <div>
      <div className="flex justify-between my-10">
        <p className="text-xl font-medium mb-5">All Product List</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="px-3 py-2 w-[10%] outline-none border border-gray-300 font-medium"
        >
          <option value="">All</option>
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
      <div className="hidden md:grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center mb-4">
        <b>ID</b>
        <b>Image</b>
        <b>Title</b>
        <b>Category</b>
        <b>Price</b>
        <b>Old Price</b>
        <b>Stock</b>
        <b className="text-center">Edit</b>
        <b className="text-center">Delete</b>
      </div>
      <hr />
      {list.length > 0 &&
        list.map((item) => {
          const img = JSON.parse(item.images);
          return (
            <div key={item.product_id}>
              <div className="hidden md:grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center">
                <p>{item.product_id}</p>
                <img
                  className="w-[75px]"
                  src={`${backendUrl}/images/${img[0]}`}
                  alt=""
                  srcset=""
                />
                <p>{item.title}</p>
                <p>{item.category}</p>
                <p>{item.new_price}</p>
                <p>{item.old_price}</p>
                <p>{item.stock}</p>
                <NavLink
                  to={`/edit/${item.product_id}`}
                  className="flex items-center gap-1 justify-center"
                >
                  <img src={logos.edit} className="w-4" />
                  <p className="text-center">Edit</p>
                </NavLink>
                <div
                  onClick={() => handleDelete(item.product_id)}
                  className="flex gap-1 justify-center items-center cursor-pointer"
                >
                  <img src={logos.delete_i} className="w-4 h-4" />
                  {/* <button className="px-0 mx-0 justify-start">Delete</button> */}
                </div>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default List;
