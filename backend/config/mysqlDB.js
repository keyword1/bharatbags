import mysql from "mysql2";
import "dotenv/config";

const connectDB = mysql
  .createPool({
    //createPool - createConnection
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export default connectDB;
