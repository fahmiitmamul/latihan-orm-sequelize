const router = require("express").Router();

router.use("/auth", require("../routers/auth"));

module.exports = router;
