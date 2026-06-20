/**
 * Wraps an async route handler and forwards any
 * rejected promise to Express's next() error handler.
 * Eliminates repetitive try/catch blocks in controllers.
 *
 * @param {Function} fn - async route handler
 * @returns {Function} Express middleware
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { catchAsync };
