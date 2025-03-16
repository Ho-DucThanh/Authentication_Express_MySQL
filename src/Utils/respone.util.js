exports.successResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({ message: message, data });
};

exports.errorResponse = (
  res,
  statusCode,
  message = "An error occurred!",
  err
) => {
  res.status(statusCode).json({
    message: message,
    error: err ? err.message : null,
  });
};
