const errorHandler = require("../helpers/errorHandler.helper");
const { Order } = require("../models/index");
const { detail_order } = require("../models/index");

module.exports = {
  getAllOrders: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 5;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const data = await Order.findAll({
        order: [["id", "ASC"]],
        offset: offset,
        limit: limit,
      });
      return res.json({
        success: true,
        message: "Get all orders successfully",
        results: data,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  makeOrder: async (req, res) => {
    try {
      const { id } = req.user;
      const { name, price, qty } = req.body;
      const createOrder = await Order.create({
        userId: id,
        total: price * qty,
      });

      const createOrderDetails = await detail_order.create({
        orderId: createOrder.id,
        productName: name,
        productPrice: price,
        qty: qty,
      });

      return res.json({
        success: true,
        message: "Create orders successfully",
        results: createOrderDetails,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  deleteOrder: async (req, res) => {
    try {
    } catch (err) {
      return errorHandler(res, err);
    }
  },
};
