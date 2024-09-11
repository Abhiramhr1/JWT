const CustomAPIError = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log('Error type:', err.constructor.name); // Debugging line
  if (err instanceof CustomAPIError) {
    console.log('Handling custom error:', err.message); // Debugging line
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.error('Unhandled error:', err); // Debugging line
  return res.status(500).send('Something went wrong. Please try again later.');
};

module.exports = errorHandlerMiddleware;
