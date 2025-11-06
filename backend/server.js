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
  /* here once the payment verified,
  > stock is deducted from DB
  > check if stock became over sold(stock<0)
  >if stock<0, set order status to 'not available' and revert the stock
  > if stock>0, set order status to available
  */
  try {
    let stock_availability = "available";
    let { txnid, orderAddress, orderedItems, amount, userId } = req.query;
    const data = await payClient.verifyPayment(txnid);
    // console.log("payU id: ", data.transaction_details[txnid].mihpayid);
    // console.log("verify from payclient ", data);
    let payu_id = data.transaction_details[txnid].mihpayid;
    console.log("ordered items for whats app: ", tempOrder);

    const status = data.transaction_details[txnid];
    if (status.status === "success") {
      // console.log("ordered items: ", tempOrder.orderedItems);
      for (const item of tempOrder.orderedItems) {
        let p_id = Number(item.id);
        await connectDB.query(
          //deduct stock
          `update products set stock=stock-? where product_id=?`,
          [item.qty, p_id]
        );
        const [deducted_data] = await connectDB.query(
          //checks if stock is -ve
          `select stock from products where product_id=?`,
          [p_id]
        );
        if (deducted_data[0].stock < 0) {
          //if stock is -ve, set order not-available
          console.log("deducted_data: ", deducted_data[0].stock);
          stock_availability = "Not-available";
        }
      }
      if (stock_availability == "Not-available") {
        for (const item of tempOrder.orderedItems) {
          let p_id = Number(item.id);
          await connectDB.query(
            //revert stock stock
            `update products set stock=stock+? where product_id=?`,
            [item.qty, p_id]
          );
        }
      }

      const inserted_data = await connectDB.query(
        `insert into orders (user_id,total_payment,transaction_id,address,item_qty,status_m,stock_status,payu_id) values (?,?,?,?,?,?,?,?)`,
        [
          tempOrder.userId, //userId,
          Number(tempOrder.amount), //Number(amount),
          tempOrder.txnid,
          JSON.stringify(tempOrder.orderAddress),
          JSON.stringify(tempOrder.orderedItems),
          "Ready to Ship",
          stock_availability,
          payu_id,
        ]
      );

      // console.log("inserted data: ", inserted_data);
      // console.log("order Id", inserted_data[0].insertId);
      tempOrder.orderId = inserted_data[0].insertId;

      //details for whatsapp message
      const whatsapp_info = {
        payu_id: payu_id,
        amount: tempOrder.amount,
        orderId: tempOrder.orderId,
      };
      // console.log("whats app message: ", whatsapp_info);

      const encodedInfo = encodeURIComponent(JSON.stringify(whatsapp_info));

      res.redirect(
        `${process.env.FRONTEND_URL}/payment-success/${txnid}?status=success&whatsapp_info=${encodedInfo}`
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
