// Export a module containing a function for sending standardized responses

module.exports = {
  sendResponse: (res, statusCode, status, messageKey, data) => {
    // Function to send a standardized response using the provided parameters

    return res.status(statusCode).json({
      statusCode: statusCode, // Include the provided HTTP status code in the response body
      status: status, // Include the provided status key in the response body
      messageKey: messageKey, // Include the provided message key in the response body
      data: data // Include the provided data in the response body
    })
  }
}
