require("dotenv").config({
  path: ".env",
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use("/", require("./src/routers"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running well :)",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
