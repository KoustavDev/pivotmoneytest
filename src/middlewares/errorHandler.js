class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error Details:", {
    name: err.name,
    message: err.message,
    statusCode: err.statusCode,
    path: req.path,
    method: req.method,
  });

  // Handle Zod validation errors
  if (err.name === "ZodError") {
    const validationErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      error: "Validation Error",
      message: "Invalid input data",
      details: validationErrors,
    });
  }

  // Handle operational errors (known errors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      error: "Request Error",
      message: err.message,
    });
  }

  // Handle API errors with status codes
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: "API Error",
      message: err.message,
    });
  }

  // Handle unknown errors (programming errors)
  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong!"
        : err.message,
  });
};

// Handle 404 errors for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

// Async error wrapper to catch async function errors
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export { AppError, errorHandler, notFoundHandler, asyncHandler };
