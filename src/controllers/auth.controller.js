const argon = require("argon2");
const jwt = require("jsonwebtoken");
const errorHandler = require("../helpers/errorHandler.helper");
const { User } = require("../models/index");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw Error("auth_no_email");
      }
      const verify = await argon.verify(user.password, password);
      if (!verify) {
        throw Error("auth_wrong_password");
      }
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
      return res.json({
        success: true,
        message: "Login successfully",
        results: { token },
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  register: async (req, res) => {
    try {
      const { email } = req.body;
      const { password } = req.body;
      const checkEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        throw Error("auth_duplicate_email");
      }
      const hashedPassword = await argon.hash(password);
      const data = {
        ...req.body,
        role: 0,
        password: hashedPassword,
      };
      const user = await User.create(data);
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
      return res.json({
        success: true,
        message: "Register successfully",
        results: { token },
      });
    } catch (err) {
      return errorHandler(res, err);
    }
  },
};
