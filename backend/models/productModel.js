import mysql from "mysql2";
import connectDB from "../config/mysqlDB.js";

const db = await connectDB;
const productSchema = `
    create table products(
    product_id int auto_increment PRIMARY KEY,
    category varchar(100),
    title varchar(255),
    details text,
    images text, 
    old_price decimal(10,2),
    new_price decimal(10,2),
    coupon varchar(50) default '',
    total_sold int default 0,
    rating_sum decimal(3,2) default 0,
    rating_count int default 0,
    rating decimal(3,2) default 0,
    bestseller boolean DEFAULT false,
    productDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )AUTO_INCREMENT = 10001;
  `;
const productModel = db;

export default productModel;
