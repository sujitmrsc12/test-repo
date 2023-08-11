// Import the 'airtable' module
const Airtable = require('airtable')

// Configure the Airtable module with API key and endpoint URL from environment variables
Airtable.configure({
  apiKey: process.env.API_TOKEN, // Your Airtable API key stored in an environment variable
  endpointUrl: process.env.ENDPOINT_URL // The Airtable API endpoint URL stored in an environment variable
})

// Export an object with a 'base' property representing the Airtable base
module.exports = {
  base: Airtable.base(process.env.BASE_ID) // Create an Airtable base instance using the base ID from an environment variable
}
