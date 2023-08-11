// Importing necessary modules and dependencies
const { v4: uuid } = require('uuid') // Importing uuid library to generate unique IDs
const { base } = require('../db/connection') // Importing database connection from a specified path
const {
  ERROR_KEY,
  SUCCESS_KEY
} = require('../shared/constants/statusConstants') // Importing error and success keys from keyConstants
const {
  SUCCESS,
  INTERNAL_SERVER_ERROR
} = require('../shared/constants/statusCodeConstants') // Importing status codes from statusConstants
const {
  SERVER_ERROR,
  RECORDED
} = require('../shared/constants/responseConstants') // Importing response messages from responseConstants
const { sendResponse } = require('../shared/util') // Importing utility function to send response

// Defining the insertSessionData function as an asynchronous function
module.exports.insertSessionData = async (req, res) => {
  console.info('Started execution of insertSessionData Function', req) // Logging the start of function execution
  try {
    // Destructuring ipAddress and urlParameter from the request body
    const { ipAddress, urlParameter } = req.body
    const sessionId = uuid().replace(/-/g, '')

    // Creating a new record in the 'sessions' table using the base object
    await base('sessions').create({
      ipAddress: ipAddress,
      sessionId: uuid().replace(/-/g, ''), // Generating a UUID and removing dashes from it
      urlParameter: JSON.stringify(urlParameter) || 'NULL' // Converting urlParameter to a JSON string
    })

    // Sending a success response with appropriate status code and messages
    return sendResponse(res, SUCCESS, SUCCESS_KEY, RECORDED, {
      sessionId: sessionId
    })
  } catch (e) {
    // If an error occurs during execution, logging the error and sending an error response
    console.error('Error occurred in insertSessionData Function', e)
    return sendResponse(res, INTERNAL_SERVER_ERROR, ERROR_KEY, SERVER_ERROR)
  }
}
