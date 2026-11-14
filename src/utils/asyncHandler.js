const asyncHandler = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    console.error("Async Handler Error:", err);

    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

export default asyncHandler;
