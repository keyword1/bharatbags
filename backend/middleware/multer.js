import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Set your upload directory path
    const uploadDir = path.join(__dirname, "../uploads/product_images");

    // You could also make it dynamic based on file type or user
    // const userUploadDir = path.join(__dirname, `../uploads/${req.user.id}`);

    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// === upload2 (named export) ===
const storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    const uploadDir = path.join(__dirname, "../uploads/admin_images");
    callback(null, uploadDir);
  },
  filename: function (req, file, callback) {
    callback(null, "banner-" + Date.now() + "-" + file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });

export default upload;
export { upload2 };
