// Import the 'joi' module for data validation
const joi = require('joi')

// Import required utility and constant modules
const { sendResponse } = require('../shared/util') // Import a utility function for sending responses
const { ERROR_KEY } = require('../shared/constants/statusConstants') // Import a constant for error key
const {
  UNPROCESSABLE_ENTITY
} = require('../shared/constants/statusCodeConstants') // Import a constant for HTTP status code

// Export a middleware function for validating session data
module.exports = {
  validateSessionData: (req, res, next) => {
    // Define a schema for validating session data parameters using 'joi'
    const validatedParams = joi
      .object()
      .keys({
        ipAddress: joi
          .string()
          .required()
          .pattern(
            new RegExp(
              /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            )
          )
          .message('ipAddress field must be a valid IP Address')
          .trim(),
        urlParameter: joi
          .any()
          .messages({ 'string.empty': 'urlParameter field can not be empty' })
      })
      .validate(req.body) // Validate the request body using the defined schema

    // If validation has errors, send an unprocessable entity response with the error details
    return validatedParams.error
      ? sendResponse(
          res,
          UNPROCESSABLE_ENTITY,
          ERROR_KEY,
          validatedParams.error.details[0].message
        )
      : next() // If validation is successful, proceed to the next middleware
  }
}
