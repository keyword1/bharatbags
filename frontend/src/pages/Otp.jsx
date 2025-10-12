import React, { useContext, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Otp = ({ setToken, setIsAuthenticated }) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/user/updateverified", {
        email,
        otp,
      });

      if (res.data.success) {
        setToken(res.data.token);
        setIsAuthenticated(true);
        setUserDetails(res.data.user);
        toast.success(res.data.message);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/collection");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-[25%] m-auto mt-14 gap-4 text-gray-600">
      <form
        onSubmit={handleOtpSubmit}
        className="flex flex-col items-center gap-2 w-full"
      >
        <p className="py-2 font-medium text-xl text-center">Enter Code</p>
        <p className="pb-2 py-2 text-center">
          We've sent verification code to your mail.
        </p>
        <input
          type="number"
          className="px-2 py-2 border w-[50%] text-center no-spinners"
          placeholder="Enter code"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-xl mt-8"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Otp;
