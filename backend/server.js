import express, { json } from "express";
import cors from "cors";
import "dotenv/config";

import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/mysqlDB.js";
import productModel from "./models/productModel.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Setup for ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());
app.use(
  "/images",
  express.static(path.join(__dirname, "uploads/product_images"))
);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
//api endpoints
app.get("/", (req, res) => {
  res.send("api working!");
});

app.get("/test", async (req, res) => {
  const sql = "SELECT * FROM users";
  // const db = await connectDB();
  productModel.query(sql, (err, data) => {
    if (err) return res.json(err);

    // const imageArry = JSON.parse(data);
    const obj = res.json(data[0].user_id);
    return "hi";
  });
});

app.listen(port, () => {
  console.log(`server listening from ${port}`);
});
