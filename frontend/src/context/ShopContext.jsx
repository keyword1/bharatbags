import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/collection/products";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../../admin/src/App";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [salesBanner, setSalesBanner] = useState();
  const [salesBannerSM, setSalesBannerSM] = useState();
  const [banner2, setBanner2] = useState();
  const [banner2SM, setBanner2SM] = useState();
  const [orderedItems, setOrderedItems] = useState([]);
  const [displayBanner, setDisplayBanner] = useState(false);
  const [displayBanner2, setDisplayBanner2] = useState(false);
  const [displayReview, setDisplayReview] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  useEffect(() => {
    //list products =============
    const fetchData = async () => {
      const result = await axios.get(backendUrl + "/api/product/list");
      // console.log(result.data.result[0]);
      const items = result.data.result[0];
      setProducts(items);
      // console.log(items);

      //list admin dashboard
      const result2 = await axios.get(
        backendUrl + "/api/product/list-admin-dashboard"
      );
      const admin_items = result2.data.result[0];
      console.log("admin items: ", admin_items[0].banner1);
      setSalesBanner(admin_items[0].banner1);
      setSalesBannerSM(admin_items[0].banner1sm);
      setBanner2(admin_items[0].banner2);
      setBanner2SM(admin_items[0].banner2sm);
      setDisplayBanner(admin_items[0].banner1_tf);
      setDisplayReview(admin_items[0].review_banner_tf);
      setDeliveryFee(Number(admin_items[0].delivery_fee));
      setDisplayBanner2(admin_items[0].banner2_tf);
    };
    fetchData();
  }, []);
  const currency = "₹";
  const delivery_fee = deliveryFee;
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const addToCart = async (itemId, qty, title, image, price) => {
    if (!token) {
      navigate("/login");
      return;
    }
    let cartData = structuredClone(cartItems);
    console.log("cart data: ", cartData);
    if (cartData[itemId]) {
      cartData[itemId][qty] += 1;
      // cartData['total'] +=1
      toast.success("Item added to cart!");
    } else {
      cartData[itemId] = {};
      cartData[itemId][qty] = 1;
      cartData[itemId]["title"] = title;
      cartData[itemId]["image"] = image;
      cartData[itemId]["price"] = price;
      cartData[itemId]["status"] = "Ready to Ship";
      toast.success("Item added to cart!");
    }
    setCartItems(cartData);
  };

  const emptyCart = () => {
    setCartItems({});
  };
  const getCartCount = () => {
    let totalCount = 0;
    // totalCount = cartItems['total']
    for (const item in cartItems) {
      totalCount += cartItems[item]["qty"];
    }
    return totalCount;
  };

  const updateCart = async (itemId, qty) => {
    let tempCartItems = structuredClone(cartItems);
    if (qty == 0) {
      delete tempCartItems[itemId];
    } else {
      tempCartItems[itemId]["qty"] = qty;
    }
    setCartItems(tempCartItems);
  };
  const getCartAmount = () => {
    let totalCartAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product.product_id == item);
      try {
        if (cartItems[item]["qty"] > 0) {
          totalCartAmount += itemInfo.new_price * cartItems[item]["qty"];
        }
      } catch (error) {}
    }
    return totalCartAmount;
  };

  useEffect(() => {}, [cartItems]);

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateCart,
    getCartAmount,
    navigate,
    emptyCart,
    orderedItems,
    setOrderedItems,
    setCartItems,
    salesBanner,
    salesBannerSM,
    displayBanner,
    displayReview,
    displayBanner2,
    banner2,
    banner2SM,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
