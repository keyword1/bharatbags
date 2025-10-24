import connectDB from "../config/mysqlDB.js";
import fs from "fs";
import path from "path";

//update banner
const updateSalesBanner = async (req, res) => {
  try {
    //======================================================delete banner first
    const [getBanner] = await connectDB.query(
      `select sales_banner1 from admin_dashboard where adminDashNo=?`,
      [1]
    );
    // console.log("get banner: ", getBanner[0].sales_banner1);
    const filename = getBanner[0].sales_banner1;
    const filePath = path.join("uploads", "admin_images", filename);
    // adjust if your path is different
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting ${filename}:`, err.message);
        } else {
          console.log(`Deleted: ${filename}`);
        }
      });
    }
    //=============================================================update banner in DB
    const image1 = req.files.image1 && req.files.image1[0];
    // console.log(title, details, price, category);
    const banner = image1.filename;
    // console.log(arr);
    const sql = await connectDB.query(
      `update admin_dashboard set sales_banner1=? where adminDashNo=?`,
      [banner, 1]
    );
    console.log(sql.insertId); //insertId = product_id (which u get in the 'sql' obj)
    res.json({ success: true, message: "updated sales banner" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//update admin dashboard
const updateAdminDashboard = async (req, res) => {
  try {
    const { disBanner, disReview, deliveryFee } = req.body;

    // Validate inputs
    if (typeof disBanner === "undefined" || typeof disReview === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing disBanner or disReview values",
      });
    }

    // Convert booleans to numeric values for MySQL (1 or 0)
    const disBannerValue = disBanner ? 1 : 0;
    const disReviewValue = disReview ? 1 : 0;

    await connectDB.query(
      `update admin_dashboard set dis_banner_tf=?, dis_review_banner_tf=?, delivery_fee=? where adminDashNo=? `,
      [disBannerValue, disReviewValue, deliveryFee, 1]
    );
    res.json({ success: true, message: "Settings updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//add product
const addProduct = async (req, res) => {
  try {
    const { title, details, price, oldPrice, category, stock } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    // console.log(title, details, price, category);
    const arr = [
      image1.filename,
      image2.filename,
      image3.filename,
      image4.filename,
    ];
    const imagesString = JSON.stringify(arr);
    // console.log(arr);
    const sql = await connectDB.query(
      `INSERT INTO products (category, title, details, images, new_price, old_price,stock) 
       VALUES (?, ?, ?, ?, ?,?,?)`,
      [category, title, details, imagesString, price, oldPrice, stock]
    );
    console.log(sql.insertId); //insertId = product_id (which u get in the 'sql' obj)
    res.json({ success: true, message: "Product added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({ success: false, message: "Product ID is required" });
    }

    // 1. Get image filenames from DB
    const row = await connectDB.query(
      "SELECT images FROM products WHERE product_id = ?",
      [id]
    );
    // console.log(row[0][0].images);
    if (row[0].length === 0) {
      return res.json({ success: false, message: "Product not found" });
    }

    const imgArr = JSON.parse(row[0][0].images);
    // 2. Delete images from file system
    imgArr.forEach((filename) => {
      const filePath = path.join("uploads", "product_images", filename); // adjust if your path is different
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting ${filename}:`, err.message);
          } else {
            console.log(`Deleted: ${filename}`);
          }
        });
      }
    });

    const result = await connectDB.query(
      `delete from products where product_id = ?`,
      [id]
    );
    res.json({ success: true, message: "deleted successfully!" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//list products
const listProducts = async (req, res) => {
  try {
    const result = await connectDB.query(`select * from products`);
    // console.log(result[0]);
    const data = result[0];
    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//list admin dashboard
const listAdminDashboard = async (req, res) => {
  try {
    const result = await connectDB.query(`select * from admin_dashboard`);
    const data = result[0];
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//list reviews
const listReviews = async (req, res) => {
  const { product_id } = req.body;
  try {
    const [result] = await connectDB.query(
      `select * from reviews where product_id=?`,
      [product_id]
    );
    const data = result[0];
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.json({ success: false, message: " Product id is required" });
    }
    const result = await connectDB.query(
      `select * from products where product_id=?`,
      [productId]
    );
    const data = result[0][0];
    console.log(result[0][0]);
    if (!data) {
      return res.json({ success: false, message: "Product not found!" });
    }
    res.json({ success: true, datas: data });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//upate product (for admin)
const updateProduct = async (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILES:", req.files);
  try {
    const { productId, title, details, price, oldPrice, category, stock } =
      req.body;
    // console.log("prodcutController-stock ", stock);
    // Support both uploaded files and existing strings from req.body
    const getImageFilename = (fileField, nameField) => {
      if (fileField && typeof fileField === "object" && fileField.filename) {
        return fileField.filename;
      }
      if (typeof nameField === "string") {
        return nameField;
      }
      return "";
    };

    const image1 = getImageFilename(
      req.files?.image1?.[0],
      req.body.image1Name
    );
    const image2 = getImageFilename(
      req.files?.image2?.[0],
      req.body.image2Name
    );
    const image3 = getImageFilename(
      req.files?.image3?.[0],
      req.body.image3Name
    );
    const image4 = getImageFilename(
      req.files?.image4?.[0],
      req.body.image4Name
    );

    const arr = [image1, image2, image3, image4];
    const imagesString = JSON.stringify(arr);
    console.log(arr);
    const sql = await connectDB.query(
      `UPDATE products 
      SET category = ?, title = ?, details = ?, images = ?, new_price = ?, old_price = ?, stock=? 
      WHERE product_id = ?`,
      [
        category,
        title,
        details,
        imagesString,
        price,
        oldPrice,
        stock,
        productId,
      ]
    );
    // console.log(sql.insertId); //insertId = product_id (which u get in the 'sql' obj)
    res.json({ success: true, message: "Product updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  removeProduct,
  listProducts,
  singleProduct,
  updateProduct,
  updateSalesBanner,
  listAdminDashboard,
  updateAdminDashboard,
  listReviews,
};
