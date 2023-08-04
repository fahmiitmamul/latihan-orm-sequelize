const errorHandler = (res, err) => {
  if (err?.message?.includes("auth_no_email")) {
    return res.status(400).json({
      success: false,
      message: "Email not found!",
    });
  }
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Error: Internal server error",
  });
};

module.exports = errorHandler;
