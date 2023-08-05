const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => {
      const filename = new Date().getTime().toString();
      return filename;
    },
  },
});

const limits = {
  fileSize: 1 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const formatFile = ["image/jpg", "image/jpeg", "image/png"];
  if (!formatFile.includes(file.mimetype)) {
    cb(Error("fileformat_error"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

const uploadMiddleware = (field) => {
  const uploadField = upload.single(field);
  return (req, res, next) => {
    uploadField(req, res, (err) => {
      try {
        if (err) {
          if (err.message === "fileformat_error") {
            throw Error("fileformat_error");
          }
          throw Error(err.message);
        }
        return next();
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });
  };
};

module.exports = uploadMiddleware;
