import React, { useContext, useEffect, useRef, useState } from "react";
import { logos } from "../assets/logos/Logo";
import { NavLink, Link } from "react-router-dom";
import icons from "../assets/icons/icons";
import { ShopContext } from "../context/ShopContext";

const Navbar = ({ setToken, isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { getCartCount, emptyCart } = useContext(ShopContext);

  useEffect(() => {
    // Whenever login state changes, close dropdown
    setOpen(false);
  }, [isAuthenticated]);

  function handleOpen() {
    setOpen(!isOpen);
  }
  let menuRef = useRef();
  useEffect(() => {
    const handler = (e) => {
      // If click is outside menuRef, close the dropdown
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="flex items-center justify-between py-5 px-5 font-small bg-[var(--yellow)]">
      <Link to="/">
        <img src={logos.logo} className="w-20" alt="" srcSet="" />
      </Link>
      <ul className="hidden sm:flex gap-7 text-sm text-black">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr />
          {/* className='w-2/4 border-none h-[1.5px] bg-gray-700 ' */}
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <div className="cursor-pointer">{icons.search_icon("search")}</div>
        {/* group - user*/}
        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>
            {/*user dropdown menu - profile icon*/}
            <div
              onClick={handleOpen}
              id="user-icon"
              className="w-5 cursor-pointer"
            >
              {icons.profile("profile")}
            </div>
            {isOpen && (
              /*group-hover:block hidden */
              <div className="absolute dropdown-menu left-0 pt-2 z-50">
                <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-[var(--light-ash)]  text-gray-500 rounded shadow-md">
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <div className="flex justify-center items-center gap-2 group cursor-pointer hover:bg-[var(--yellow)] rounded">
                      <div>
                        {icons.profile("text-gray-500 group-hover:fill-black")}
                      </div>
                      <p className="group-hover:text-black">Profile</p>
                    </div>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setOpen(false)}
                    className="w-[100%]"
                  >
                    <div className="flex justify-center items-center gap-2 group cursor-pointer py-1 hover:bg-[var(--yellow)] rounded">
                      <div>
                        {icons.orders("text-gray-500 group-hover:fill-black")}
                      </div>
                      <p className="group-hover:text-black">Orders</p>
                    </div>
                  </Link>
                  <Link to="/history" onClick={() => setOpen(false)}>
                    <div className="flex justify-center items-center gap-2 group cursor-pointer py-1 hover:bg-[var(--yellow)] rounded">
                      <div>
                        {icons.order_history(
                          "text-gray-500 group-hover:fill-black"
                        )}
                      </div>
                      <p className="group-hover:text-black">History</p>
                    </div>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => {
                      setToken("");
                      setIsAuthenticated(false);
                      emptyCart();
                    }}
                  >
                    <div className="flex justify-center items-center gap-2 group    cursor-pointer py-1 hover:bg-[var(--yellow)] rounded">
                      <div>
                        {icons.logout("text-gray-500 group-hover:fill-black")}
                      </div>
                      <p className="group-hover:text-black">Logout</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="flex flex-col items-center gap-1">
            <p>LOGIN</p>
            <hr />
          </NavLink>
        )}
        <Link to="/cart" className="relative">
          {icons.cart("cart")}
          <p className="absolute left-1/4 top-[-12px] center bg-black rounded-full text-white text-center text-[10px] w-4">
            {getCartCount()}
          </p>
        </Link>
        <div
          onClick={() => setVisible(true)}
          className="mouse-pionter sm:hidden"
        >
          {icons.menu_icon("menu-icon")}
        </div>
      </div>
      {/* burger-menu for smaller screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all      ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-3 py-4 px-4 cursor-pointer"
          >
            <div>{icons.arrowBack_icon("arrow-back")}</div>
            <p>Back</p>
            <hr />
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
