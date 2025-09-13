import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import connectDB from "../config/mysqlDB.js";

const orderRouter = express.Router();

orderRouter.post("/place", verifyToken, async (req, res) => {
  const { cartItems, totalAmount, paymentId, address, orderedItems } = req.body;
  const userId = req.user.id; // ✅ extracted securely from token

  // console.log("test: ", orderedItems[0].id, orderedItems[0].qty);
  // TODO:Save to DB using userId
  const sql = await connectDB.query(
    `insert into orders (user_id,total_payment,total_payment_id,address,item_qty,status_m) values (?,?,?,?,?,?)`,
    [
      userId,
      totalAmount,
      paymentId,
      address,
      JSON.stringify(orderedItems),
      "Ready to Ship",
    ]
  );
  // console.log("orderroute: Placing order for user:", orderedItems);

  // Mock success
  res.status(200).json({ message: "Order placed successfully" });
});

//list user orders
orderRouter.post("/user-orders", async (req, res) => {
  const { userId } = req.body;
  try {
    const data = await connectDB.query(`select * from orders where user_id=?`, [
      userId,
    ]);
    // console.log("order-route: ", data[0]);
    return res.json({ success: true, orders: data[0] });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});
//list user orders-history
orderRouter.post("/user-orders-history", async (req, res) => {
  const { userId } = req.body;
  try {
    const data = await connectDB.query(
      `select * from orders_history where user_id=?`,
      [userId]
    );
    // console.log("order-route: ", data[0]);
    return res.json({ success: true, orders: data[0] });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

//check if user reviewed it or not
orderRouter.post("/user-review", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const [rows] = await connectDB.query(
      `select * from reviews where user_id=? and product_id=?`,
      [userId, productId]
    );
    if (rows.length > 0) {
      // Review exists
      return res.json({
        success: true,
        reviewed: true,
        message: "User already reviewed this item",
      });
    } else {
      // No review yet
      return res.json({
        success: true,
        reviewed: false,
        message: "No review given yet",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

//add user review
orderRouter.post("/add-review", async (req, res) => {
  const { userId, userName, productId, rating, review, orderId } = req.body;
  try {
    const [rows] = await connectDB.query(
      `insert into reviews (user_id,user_name,product_id,rating, review) values (?,?,?,?,?)`,
      [userId, userName, productId, rating, review]
    );

    //updates the rating total, rating count
    await connectDB.query(
      `update products set rating_sum=rating_sum+?, rating_count=rating_count+1 where product_id=?`,
      [rating, productId]
    );

    await connectDB.query(
      `update products set rating=rating_sum/rating_count where product_id=?`,
      [productId]
    );
    const [data] = await connectDB.query(
      `select item_qty from orders_history where order_id=?`,
      [orderId]
    );
    // console.log("orderRoute: ", data[0].item_qty);
    if (data.length > 0) {
      let items = JSON.parse(data[0].item_qty);

      // update review_tf for the matching product
      items = items.map((item) => {
        if (item.id == productId && !item.review_tf) {
          return { ...item, review_tf: true };
        } else {
          return item;
        }
      });

      //save updated item_qty back to DB
      await connectDB.query(
        `update orders_history set item_qty=? where order_id=?`,
        [JSON.stringify(items), orderId]
      );
    }

    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});

//list alluser orders
orderRouter.post("/all-orders", async (req, res) => {
  try {
    const data = await connectDB.query(
      `select o.*,u.first_name, u.email,u.phone_number from orders o JOIN users u ON o.user_id=u.user_id where o.status_m != "Delivered" order BY o.order_id DESC `
    );
    // console.log("order-route: ", data[0]);
    return res.json({ success: true, orders: data[0] });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});
//list alluser orders history
orderRouter.post("/history", async (req, res) => {
  try {
    const data = await connectDB.query(
      `select o.*,u.first_name, u.email,u.phone_number from orders_history o JOIN users u ON o.user_id=u.user_id order BY o.order_id DESC `
    );
    // console.log("order-route: ", data[0]);
    return res.json({ success: true, orders: data[0] });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
});
//update order status when it is shipped
orderRouter.post("/update-status", async (req, res) => {
  const { order_id, status_m } = req.body;
  console.log("orderRoute-updatestatus: ", order_id, status_m);
  try {
    const [sql] = await connectDB.query(
      `UPDATE orders SET status_m = ? WHERE order_id = ?`,
      [status_m, order_id]
    );
    if (sql.affectedRows > 0) {
      return res.json({
        success: true,
        message: "Order status updated successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

//update order status when it DELIVERED
orderRouter.post("/move-to-history", async (req, res) => {
  const { order_id, status_m } = req.body;
  const connection = await connectDB.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Copy order row into history table with new status_m
    await connection.query(
      `INSERT INTO orders_history (order_id, user_id, total_payment, total_payment_id, address, item_qty, status_m, created_at)
       SELECT order_id, user_id, total_payment, total_payment_id, address, item_qty, ? AS status_m, created_at
       FROM orders
       WHERE order_id = ?`,
      [status_m, order_id]
    );

    // 2. Delete from orders
    await connection.query(`DELETE FROM orders WHERE order_id = ?`, [order_id]);

    // 3. Commit
    await connection.commit();

    res.json({
      success: true,
      message: "Order moved to history with Delivered status",
    });
  } catch (error) {
    await connection.rollback();
    console.error("move-to-history error:", error);
    res.status(500).json({
      success: false,
      message: "Transaction failed, rolled back",
    });
  } finally {
    connection.release();
  }
});

export default orderRouter;
