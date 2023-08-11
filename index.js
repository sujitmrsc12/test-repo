// Load environment variables from a .env file
require('dotenv').config()
// Import necessary dependencies
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const cors = require('cors')

// Express app initialization
const app = require('express')()

//Enabled cors to prevent from cros origin problem
app.use(cors())

// Parse incoming JSON and URL-encoded data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define a route for serving the 'index.html' file
app.get('/index', (req, res) => {
  // Send the 'index.html' file located in the 'webpage' directory
  res.sendFile(__dirname + '/webpage/index.html')
})

// Include routes defined in './route/route'
app.use('/', require('./route/route'))
// Export the Express app wrapped in the serverless handler
module.exports.handler = serverless(app)
