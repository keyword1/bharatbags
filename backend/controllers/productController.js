import connectDB from "../config/mysqlDB.js";
import fs from "fs";
import path from "path";

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
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
  try {
    const { productId, title, details, price, oldPrice, category, stock } =
      req.body;
    console.log("prodcutController-stock ", stock);
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
};
