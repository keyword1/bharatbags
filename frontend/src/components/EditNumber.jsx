import React, { useContext, useState } from "react";
import Title from "../components/Title";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const EditNumber = ({ userDetails, onClose }) => {
  const { setUserDetails } = useContext(UserContext);
  const [formData, setFormData] = useState({ phone_number: userDetails.phone });
  console.log(userDetails);
  const updateNumber = async (e) => {
    e.preventDefault();
    const res = await axios.post(backendUrl + "/api/user/updatephonenumber", {
      ...formData,
      user_id: userDetails.id,
    });
    if (res.data.success) {
      setUserDetails((prev) => ({
        ...prev,
        phone: formData.phone_number,
      }));
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    if (onClose) {
      onClose();
    }
  };
  const handleChange = (e) => {
    if (e.target.value.length < 11) {
      console.log("length: ", e.target.value.length);
      setFormData({ phone_number: e.target.value });
    }
  };
  return (
    <form onSubmit={updateNumber}>
      <div>
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          {/* Left side */}
          <div className="text-xl sm:text-2xl text-center font-bold">
            <p>Update Number</p>
          </div>

          <input
            className="border border-gray-300 rounded w-full px-1.5 py-1.5 text-sm 
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
          [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Your Phone Number here"
            name="phone"
            onChange={handleChange}
            value={formData.phone_number}
            required
          />
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

export default EditNumber;
