const sendResponse = require("../utils/responseHandler");

/**
 * Generic middleware to validate request body using Joi schema
 * @param {Joi.Schema} schema - Joi validation schema
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  next();
};

module.exports = { validate };
