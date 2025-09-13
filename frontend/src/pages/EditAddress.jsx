import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";

const EditAddress = ({ onClose, addressTF, userDetails }) => {
  const { setUserDetails } = useContext(UserContext);
  const address_n = userDetails.address;
  const [formData, setFormData] = useState({
    street: address_n?.street || "",
    city: address_n?.city || "",
    district: address_n?.district || "",
    state: address_n?.state || "",
    zip: address_n?.zip || "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const updateAddress = async (e) => {
    e.preventDefault();
    try {
      if (addressTF) {
        const res = await axios.post(backendUrl + "/api/user/updateaddress", {
          ...formData,
          user_id: userDetails.id,
        });

        if (res.data.success) {
          setUserDetails((prev) => ({
            ...prev,
            address: formData,
          }));
          toast.success(res.data.message);
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/createaddress", {
          ...formData,
          user_id: userDetails.id,
        });

        if (res.data.success) {
          setUserDetails((prev) => ({
            ...prev,
            address: formData,
          }));
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update address");
    }
    if (onClose) {
      onClose();
    }
  };
  return (
    <form onSubmit={updateAddress}>
      <div>
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          {/* Left side */}
          <div className="text-xl sm:text-2xl text-center font-bold">
            <p>Update Address</p>
          </div>
          <div>
            <label className="text-[10px]">Street</label>
            <input
              className="border border-gray-300 rounded w-full px-1.5 py-1.5 text-sm"
              type="text"
              value={formData.street}
              onChange={handleChange}
              placeholder="street"
              name="street"
              required
            />
          </div>
          <div className="flex gap-3">
            <div>
              <label className="text-[10px]">City</label>
              <input
                className="border border-gray-300 rounded w-full px-1.5 py-1.5"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                name="city"
                required
              />
            </div>
            <div>
              <label className="text-[10px]">District</label>
              <input
                className="border border-gray-300 rounded w-full px-1.5 py-1.5"
                type="text"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                name="district"
                required
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div>
              <label className="text-[10px]">Zip</label>
              <input
                className="border border-gray-300 rounded w-full px-1.5 py-1.5 [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip Code"
                name="zip"
                required
              />
            </div>
            <div>
              <label className="text-[10px]">state</label>
              <input
                className="border border-gray-300 rounded w-full px-1.5 py-1.5"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                name="state"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button type="submit" className="p-2 bg-black text-white rounded-md">
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditAddress;
