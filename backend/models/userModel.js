import mysql from "mysql2";
import connectDB from "../config/mysqlDB.js";

const db = await connectDB;
const userSchema = `
    create table users(
    user_id int auto_increment PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255) unique,
    password varchar(255),
    phone_number VARCHAR(20),
    productDate DATETIME DEFAULT CURRENT_TIMESTAMP
    )AUTO_INCREMENT = 1001;
  `;
const userModel = db;

export default userModel;
