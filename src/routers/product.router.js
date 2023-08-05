const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");

productRouter.get("/", productController.getAllProduct);
productRouter.post(
  "/create",
  uploadMiddleware("picture"),
  productController.createProduct
);

module.exports = productRouter;
