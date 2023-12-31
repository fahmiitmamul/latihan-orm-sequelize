const orderRouter = require("express").Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

orderRouter.get("/", orderController.getAllOrders);
orderRouter.post("/create", authMiddleware, orderController.makeOrder);
orderRouter.delete("/:id", authMiddleware, orderController.deleteOrder);

module.exports = orderRouter;
