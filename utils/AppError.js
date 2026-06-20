/**
 * Custom error class extending native Error.
 * Allows attaching an HTTP status code to errors
 * so the global error handler can respond correctly.
 */
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'AppError';
  }
}

module.exports = { AppError };
