import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized! Login again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    if (!token_decode || token_decode.role !== "admin") {
      return res.json({
        success: false,
        message: "Not authorized! Login again",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export default adminAuth;
