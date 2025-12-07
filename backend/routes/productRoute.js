import express from "express";
import {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
  updateProduct,
  updateHeroBanner,
  updateOfferBanner,
  listAdminDashboard,
  updateAdminDashboard,
  listReviews,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { upload2 } from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/list", listProducts);
productRouter.post("/single", singleProduct);
productRouter.post(
  "/edit",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
//admin features ********-----**************
productRouter.post(
  "/update-hero-banner",
  adminAuth,
  upload2.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateHeroBanner
);
productRouter.post(
  "/update-offer-banner",
  adminAuth,
  upload2.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateOfferBanner
);
productRouter.get("/list-admin-dashboard", listAdminDashboard);
productRouter.post("/update-admin-dashboard", adminAuth, updateAdminDashboard);
productRouter.post("/list-reviews", listReviews);

export default productRouter;
