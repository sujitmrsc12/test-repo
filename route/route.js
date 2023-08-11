// Import the 'express' module to create an Express application
const app = require('express')()

// Import the middleware and controller modules
const { validateSessionData } = require('../middleware/validator') // Import the session data validation middleware
const {
  insertSessionData
} = require('../controllers/insertSessionDataController') // Import the controller for inserting session data
const { getSessionData } = require('../controllers/getSessionDataController') // Import the controller for getting session data

// Define routes and corresponding middleware/controllers
app.post('/session-data', validateSessionData, insertSessionData)
// Define a POST route '/session-data' that uses the session data validation middleware and the insert session data controller

app.get('/session-data', getSessionData)
// Define a GET route '/session-data' that uses the get session data controller

// Export the Express application
module.exports = app
