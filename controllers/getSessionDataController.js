// Import required modules and constants
const { base } = require('../db/connection') // Import the Airtable base instance
const { sendResponse } = require('../shared/util') // Import a utility function for sending responses
const {
  ERROR_KEY,
  SUCCESS_KEY
} = require('../shared/constants/statusConstants') // Import constants for error and success keys
const {
  SUCCESS,
  INTERNAL_SERVER_ERROR
} = require('../shared/constants/statusCodeConstants') // Import constants for HTTP status codes
const {
  SERVER_ERROR,
  RECORDS_FETCHED
} = require('../shared/constants/responseConstants') // Import constants for response messages

// Define and export the 'getSessionData' asynchronous function
module.exports.getSessionData = async (req, res) => {
  console.info('Started execution of getSessionData Function', req) // Log the start of the function execution with request info
  try {
    const dataList = []
    await new Promise((resolve, reject) => {
      base('sessions')
        .select()
        .eachPage(
          async function page (records, fetchNextPage) {
            records.forEach(function (record) {
              dataList.push(record.fields)
            })

            await deplay(fetchNextPage)
          },
          function done (err) {
            if (err) {
              reject(err)
            }
            resolve(dataList)
          }
        )
    })

    // Send a successful response with fetched session records
    return sendResponse(res, SUCCESS, SUCCESS_KEY, RECORDS_FETCHED, dataList)
  } catch (e) {
    console.error('Error occurred in getSessionData Function', e) // Log the error if an exception occurs
    // Send an error response in case of an exception
    return sendResponse(res, INTERNAL_SERVER_ERROR, ERROR_KEY, SERVER_ERROR)
  }
}

async function deplay (fetchNextPage) {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      fetchNextPage()
      res()
    }, 1000)
  })
}
