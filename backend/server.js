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
import cron from "node-cron";
import PayU from "payu-websdk";
import crypto from "crypto";

///TTL
// cron.schedule("*/3 * * * * *", () => {
//   console.log("This runs every minute on the server.");
// });
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
app.use(
  "/admin_images",
  express.static(path.join(__dirname, "uploads/admin_images"))
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
//-----------------------
const tempOrder = {};
app.use("/api/payment/verify/", async (req, res) => {
  try {
    let { txnid, orderAddress, orderedItems, amount, userId } = req.query;
    const data = await payClient.verifyPayment(txnid);
    console.log("verify from payclient ", data);
    const status = data.transaction_details[txnid];
    if (status.status === "success") {
      // return res.json({ success: true, message: "Payment successful" });
      await connectDB.query(
        `insert into orders (user_id,total_payment,transaction_id,address,item_qty,status_m) values (?,?,?,?,?,?)`,
        [
          tempOrder.userId, //userId,
          Number(tempOrder.amount), //Number(amount),
          tempOrder.txnid,
          JSON.stringify(tempOrder.orderAddress),
          JSON.stringify(tempOrder.orderedItems),
          "Ready to Ship",
        ]
      );
      res.redirect(
        `${process.env.FRONTEND_URL}/payment-success/${txnid}?status=success`
      );
    } else {
      res.redirect(
        `${process.env.FRONTEND_URL}/payment-success/${txnid}?status=failed`
      );
    }
  } catch (error) {
    console.error("Payment verify error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const payClient = new PayU(
  {
    key: process.env.MERCHANT_KEY,
    salt: process.env.MERCHANT_SALT,
  },
  process.env.MERCHANT_MODE //TEST (or) LIVE
);

app.post("/api/initiate-payment", async (req, res) => {
  try {
    const {
      userId,
      firstname,
      email,
      phone,
      productinfo,
      amount,
      txnid,
      orderAddress,
      orderedItems,
    } = req.body;
    tempOrder.userId = userId;
    tempOrder.amount = amount;
    tempOrder.txnid = txnid;
    tempOrder.orderAddress = orderAddress;
    tempOrder.orderedItems = orderedItems;
    console.log("temp order details: ", tempOrder);
    let data = {
      isAmountFilledByCustomer: false,
      txnid,
      amount,
      currency: "INR",
      productinfo,
      firstname,
      email,
      phone,
      surl: `${process.env.BACKEND_URL}/api/payment/verify?txnid=${txnid}`, //`http://localhost:3000/verify/${txnid}`
      furl: `${process.env.BACKEND_URL}/api/payment/verify?txnid=${txnid}`, //`http://localhost:3000/verify/${txnid}`
      udf1: "custom1",
      udf2: "",
      udf3: "",
      udf4: "",
      udf5: "",
    };
    const hashString = `${process.env.MERCHANT_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}||||||${process.env.MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");
    data.hash = hash;
    const response = await payClient.paymentInitiate(data);
    res.send(response);
  } catch (error) {
    console.log("payu error: ", error);
    res.status(500).send(error);
  }
});
//------------------------------
app.listen(port, () => {
  console.log(`server listening from ${port}`);
});
