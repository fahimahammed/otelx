const logger = require('./logger');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  logger.error(`[${req.method}] ${req.path} - Error: ${err.message}`, {
    statusCode: err.statusCode,
    stack: err.stack,
    url: req.originalUrl,
  });

  if (err.name === 'CastError') {
    err = new AppError(`Resource not found: Invalid ${err.path}`, 400);
  }

  if (err.name === 'JsonWebTokenError') {
    err = new AppError('Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    err = new AppError('Token has expired', 401);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    statusCode: err.statusCode,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const notFoundHandler = (req, res, next) => {
  const message = `Route not found: ${req.originalUrl}`;
  logger.warn(message);
  next(new AppError(message, 404));
};

module.exports = {
  AppError,
  catchAsync,
  errorHandler,
  notFoundHandler,
};
