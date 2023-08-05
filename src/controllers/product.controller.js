const errorHandler = require("../helpers/errorHandler.helper");
const { Product } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
  getAllProduct: async (req, res) => {
    try {
      const search = req.query.search || "";
      const limit = req.query.limit ? parseInt(req.query.limit) : 5;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const offset = page === 1 ? 0 : (page - 1) * limit;
      const data = await Product.findAll({
        where: {
          productName: {
            [Op.iLike]: `%${search}%`,
          },
        },
        order: [["productName", "ASC"]],
        offset: offset,
        limit: limit,
      });
      return res.json({
        success: true,
        message: "Get products successfully",
        results: data,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  createProduct: async (req, res) => {
    try {
      if (req.file) {
        req.body.picture = req.file.filename;
      }
      const product = {
        productName: req.body.name,
        productPrice: req.body.price,
        picture: req.body.picture,
      };
      const data = await Product.create(product);
      return res.json({
        success: true,
        message: "Create products successfully",
        results: data,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  updateProduct: async (req, res) => {
    try {
      if (req.file) {
        req.body.picture = req.file.filename;
      }
      const product = {
        productName: req.body.name,
        productPrice: req.body.price,
        picture: req.body.picture,
      };
      const data = await Product.update(product, {
        where: {
          id: req.params.id,
        },
      });
      return res.json({
        success: true,
        message: "Update products successfully",
        results: data,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const data = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json({
        success: true,
        message: "Delete products successfully",
        results: data,
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
};
