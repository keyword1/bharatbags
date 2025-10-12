import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Orders from "./pages/Orders";
import History from "./pages/History";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    // localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    token ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }, []);
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]]">
      <Navbar
        setToken={setToken}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/collection" />
            ) : (
              <Login
                setToken={setToken}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/collection" />
            ) : (
              <Register setToken={setToken} />
            )
          }
        />
        <Route
          path="/otp"
          element={
            isAuthenticated ? (
              <Navigate to="/collection" />
            ) : (
              <Otp
                setToken={setToken}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/history"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <History />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* <Route path="/orders" element={<Orders />} /> */}
        <Route
          path="/place-order"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PlaceOrder
                setToken={setToken}
                setIsAuthenticated={setIsAuthenticated}
              />
            </PrivateRoute>
          }
        />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
