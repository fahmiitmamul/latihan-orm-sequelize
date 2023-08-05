const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

productRouter.get("/", productController.getAllProduct);
productRouter.post(
  "/create",
  authMiddleware,
  uploadMiddleware("picture"),
  productController.createProduct
);
productRouter.patch(
  "/update/:id",
  authMiddleware,
  uploadMiddleware("picture"),
  productController.updateProduct
);

module.exports = productRouter;
