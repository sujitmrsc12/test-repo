// Export a module containing common HTTP status codes for responses

module.exports = {
  SUCCESS: 200, // HTTP status code for successful request/response
  UNPROCESSABLE_ENTITY: 422, // HTTP status code for when the server understands the content type and the syntax of the request entity but was unable to process the contained instructions
  INTERNAL_SERVER_ERROR: 500 // HTTP status code for when an unexpected condition was encountered by the server and no more specific message is suitable
}
