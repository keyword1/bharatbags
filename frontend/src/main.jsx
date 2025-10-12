import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext";
import UserContextProvider from "./context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "377567116611-6jemlint23n9lsle53mjas923ib952ga.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
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
  </GoogleOAuthProvider>
);
