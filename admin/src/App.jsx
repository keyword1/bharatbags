import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import Edit from "./pages/Edit";
import History from "./pages/History";
import Features from "./pages/Features";
import AddSalesBanner from "./pages/AddSalesBanner";
import Dashboard from "./pages/Dashboard";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[75%] mx-auto ml-[max(5vw, 25px)] my-8 text-base text-gray-600">
              <Routes>
                <Route
                  path="/dashboard"
                  element={<Dashboard token={token} />}
                />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route
                  path="/edit/:product_id"
                  element={<Edit token={token} />}
                />
                <Route path="/history" element={<History token={token} />} />
                <Route path="/features" element={<Features token={token} />} />
                <Route
                  path="/add-sales-banner"
                  element={<AddSalesBanner token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
