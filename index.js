require("dotenv").config({
  path: ".env",
});

const express = require("express");
const app = express();
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
const PORT = process.env.PORT || 8080;

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
