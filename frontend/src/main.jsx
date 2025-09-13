import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import UserContextProvider from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ShopContextProvider>
    </BrowserRouter>
  </UserContextProvider>
);
