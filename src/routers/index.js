const router = require("express").Router();

router.use("/auth", require("./auth.router"));
router.use("/product", require("./product.router"));
router.use("/orders", require("./order.router"));

module.exports = router;
