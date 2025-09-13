import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [errorText, setErrorText] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.cPassword) return setPassErr(true);

    try {
      const res = await axios.post(backendUrl + "/api/user/register", form);
      console.log(res.data.success);
      if (res.data.success) {
        setToken(res.data.token);
        navigate("/otp", { state: { email: form.email } });
      } else if (res.data.status === "register") {
        setShow(true);
        console.log(res.data.status);
      } else if (!res.data.success) {
        setErrorText("User already exists, please try another email");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-[25%] m-auto mt-14 gap-4 text-gray-600">
      {show && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative bg-white text-gray-600 px-6 py-4 rounded-xl shadow-lg text-xs w-fit border border-red-500 my-20 mx-20">
            <div className="flex flex-col items-center gap-2">
              <b>Password must be strong :</b>
              <p>min 8 characters,</p>
              <p>at least 1 uppercase,</p>
              <p>1 lowercase,</p>
              <p>1 number,</p>
              <p>and 1 symbol.</p>
            </div>
          </div>
        </div>
      )}
      {passErr && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="relative bg-white text-gray-600 px-6 py-4 rounded-xl shadow-lg text-xs w-fit border border-red-500 my-20 mx-20">
            <div className="flex flex-col justify-center">
              <p>Password doesn't match</p>
            </div>
          </div>
        </div>
      )}
      <p className="text-3xl font-semibold">Sign Up</p>
      <p className="text-sm text-red-400">{errorText}</p>
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-2 mt-6 w-full"
      >
        <div className="flex gap-2">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="px-2 py-2 border w-[100%]"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="px-2 py-2 border w-[100%]"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="px-2 py-2 border no-spinners"
          type="number"
          placeholder="Phone Number"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="px-2 py-2 border"
          type="email"
          placeholder="Email"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          className="px-2 py-2 border"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="cPassword"
          value={form.cPassword}
          onChange={handleChange}
          className="px-2 py-2 border"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <p className="w-[60%]">
            <b>Password must be strong:</b> min 8 characters, at least 1
            uppercase, 1 lowercase, 1 number, and 1 symbol.
          </p>
          <p
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login here
          </p>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-xl mt-8"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
