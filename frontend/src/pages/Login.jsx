import React, { useContext, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Login = ({ setToken, setIsAuthenticated }) => {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (!res.data.success) {
        setErrorText("Invalid Credentials");
        return toast.error(res.data.message);
      }
      if (res.data.status === "otp")
        return navigate("/otp", { state: { email } });

      setToken(res.data.token);
      setIsAuthenticated(true);
      navigate("/collection");
      setUserDetails(res.data.user);
      localStorage.setItem("userDetails", JSON.stringify(res.data.user));
      console.log("user Details: ", res.data.user);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-[25%] m-auto mt-14 gap-4 text-gray-600">
      <p className="text-3xl font-semibold">Login</p>
      <p className="text-sm text-red-400">{errorText}</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 mt-6 w-full">
        <input
          type="email"
          placeholder="Email"
          required
          className="px-2 py-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="px-2 py-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end text-sm text-blue-600 mt-2">
          <p className="cursor-pointer">Forgot password?</p>
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 text-xl mt-8"
        >
          Login
        </button>
        <p
          onClick={() => navigate("/register")}
          className="text-sm text-blue-600 cursor-pointer text-center mt-4"
        >
          Create an account
        </p>
      </form>
    </div>
  );
};

export default Login;
