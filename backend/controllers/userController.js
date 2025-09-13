import validator from "validator";
import connectDB from "../config/mysqlDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { email_template } from "../../frontend/src/components/email_template.js";
import { verified_mail_template } from "../../frontend/src/components/verified_mail_template.js";
import nodemailer from "nodemailer";

const db = connectDB;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, { expiresIn: "7d" });
};
const transporter = nodemailer.createTransport({
  // secure: true,
  // host: "smtp.gmail.com",
  // port: 465,
  // (OR)
  service: "gmail",
  auth: {
    user: "arajeshvfx@gmail.com",
    pass: "onhupkppswjbhwaw",
  },
});

//creating otp
const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

//creating mail
const otpMailOption = (temp) => {
  return {
    from: "bharatbags@gmail.com",
    to: "arajeshneo@gmail.com",
    subject: "Verify Your Mail",
    html: email_template(temp),
  };
};
//creating mail
const verifiedMailOption = () => {
  return {
    from: "bharatbags@gmail.com",
    to: "arajeshneo@gmail.com",
    subject: "Verify Your Mail",
    html: verified_mail_template(),
  };
};

//user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const user = await connectDB.query("select * from users where email = ?", [
    //   email,
    // ]);
    const user = await connectDB.query(
      `SELECT u.*, a.street, a.city, a.district, a.state, a.zip, a.address_id
   FROM users u
   LEFT JOIN addresses a ON u.user_id = a.user_id
   WHERE u.email = ?`,
      [email]
    );
    if (!user[0][0]) {
      return res.json({
        success: false,
        message: "User does not exists",
        status: "register",
      });
    }
    // If OTP expired (older than 30 mins), generate a new one
    if (!user[0][0].isVerified) {
      const oldOtp = user[0][0].otp;
      const otpDate = user[0][0].otp_date;
      const now = new Date();
      if (now - otpDate > 30 * 60 * 1000) {
        const newOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
        try {
          await db.query(
            "UPDATE users SET otp = ?, otp_date = NOW() WHERE email = ?",
            [newOtp, email]
          );
          transporter.sendMail(otpMailOption(newOtp));
        } catch (error) {
          console.log(error.message);
        }
      } else {
        transporter.sendMail(otpMailOption(oldOtp));
      }

      return res.json({
        success: false,
        message: "User email not verified",
        status: "otp",
      });
    }
    const isMatch = await bcrypt.compare(password, user[0][0].user_password);
    if (isMatch) {
      const token = createToken(user[0][0].user_id);
      const user2 = user[0][0];
      res.json({
        success: true,
        token,
        user: {
          id: user2.user_id,
          name: user2.first_name,
          email: user2.email,
          phone: user2.phone_number,
          address: user2.street
            ? {
                street: user2.street,
                city: user2.city,
                district: user2.district,
                state: user2.state,
                zip: user2.zip,
              }
            : null, // if no address exists
        },
      });
      console.log("user controller: ", user2);
    } else {
      // transporter.sendMail();
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//user register
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    // console.log(firstName, lastName, email, password, phoneNumber);
    //check for user already exists
    const exists = await connectDB.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    // console.log("user contoller - exists: ", exists[0][0]);
    if (exists[0][0]) {
      // console.log("user controller: user exits");
      return res.json({ success: false, message: "User already exists" });
    }
    //validating email format and password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8 || !validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
        status: "register",
      });
    }

    if (phoneNumber.length < 10) {
      return res.json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    //hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sql = await db.query(
      `INSERT INTO users (first_name, last_name, email, user_password, phone_number,otp,otp_date) 
       VALUES (?, ?, ?, ?, ?,?, NOW())`,
      [firstName, lastName, email, hashedPassword, phoneNumber, otp]
    );
    transporter.sendMail(otpMailOption(otp));
    const token = createToken(sql[0].insertId);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRETE_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//update otp - recreate otp again
const updateOtp = async (req, res) => {
  try {
  } catch (error) {}
};

//update verified - set true or false
const updateVerified = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await connectDB.query("select * from users where email = ?", [
      email,
    ]);
    if (user[0][0].otp == otp) {
      await db.query("UPDATE users SET isVerified = ?, otp=? WHERE email = ?", [
        1,
        0,
        email,
      ]);
      transporter.sendMail(verifiedMailOption());
      return res.json({ success: true, message: "Email verified!" });
    } else {
      return res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//update user address (has separate address table in DB)

const createAddress = async (req, res) => {
  const { street, city, district, state, zip, user_id } = req.body;
  try {
    const sql = await db.query(
      `INSERT INTO addresses (street, city, district, state, zip,user_id) 
       VALUES (?, ?, ?, ?, ?,?)`,
      [street, city, district, state, zip, user_id]
    );
    res.json({ success: true, message: "Address saved successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
const updateAddress = async (req, res) => {
  const { street, city, district, state, zip, user_id } = req.body;
  try {
    await db.query(
      "UPDATE addresses SET street = ?, city=?, district=?, state=?,zip=? WHERE user_id = ?",
      [street, city, district, state, zip, user_id]
    );
    res.json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
const updatePhoneNumber = async (req, res) => {
  console.log("userCOntroller, data incoming: ", req.body);
  const { phone_number, user_id } = req.body;
  try {
    await db.query("UPDATE users SET phone_number=? WHERE user_id = ?", [
      phone_number,
      user_id,
    ]);
    res.json({ success: true, message: "Phone Number updated successfully" });
  } catch (error) {
    console.log("userController: updateNumber: ", error.message);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  loginAdmin,
  updateOtp,
  updateVerified,
  createAddress,
  updateAddress,
  updatePhoneNumber,
};
