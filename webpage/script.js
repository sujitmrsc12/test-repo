const apiUrl =
  'https://qy1sofyn6h.execute-api.us-east-1.amazonaws.com/dev/session-data' // API endpoint URL

const button = document.getElementById('button') // Get the button element by its ID

button.addEventListener('click', getSessionData) // Attach click event listener to the button

// Function to insert session data into the server
async function insertSessionData (ipAddress) {
  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    // Create an object to store the query parameters
    const queryParams = {}

    // Iterate through all query parameters and store them in the object
    urlParams.forEach((value, key) => {
      queryParams[key] = value
    })
    // POST request example
    const postData = {
      ipAddress: ipAddress,
      urlParameter: queryParams
    }

    return await axios.post(apiUrl, postData) // Make a POST request to the     API
  } catch (error) {
    console.error('Error occurred in insertSessionData function', error)
    alert('An error occurred. Please try again later.')
  }
}

// Function to fetch and display session data
async function getSessionData () {
  try {
    // GET request example
    var sessionsData = await axios.get(apiUrl) // Make a GET request to the API
    sessionsData = sessionsData?.data?.data
    if (sessionsData?.length) {
      const table = document.getElementById('table')
      table.hidden = false // Show the table
      const tableBody = document.getElementById('table-body')
      sessionsData.forEach(session => {
        const tableRow = document.createElement('tr')
        Object.keys(session).forEach(key => {
          const tableData = document.createElement('td')
          tableData.textContent = session[key]
          tableRow.appendChild(tableData)
        })
        tableBody.appendChild(tableRow)
      })
      button.hidden = true // Hide the button after fetching data
    }
  } catch (error) {
    console.error('Error occurred in getSessionData function', error)
    alert('An error occurred. Please try again later.')
  }
}

// Function to run when the window loads
window.onload = async () => {
  const sessionId = sessionStorage.getItem('sessionId')

  // Check if sessionId is undefined or missing
  //   if (sessionId === 'undefined' || sessionId === null) {
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(async data => {
      const ipAddress = data.ip
      const response = await insertSessionData(ipAddress)
      sessionStorage.setItem('sessionId', response?.data?.data?.sessionId)
    })
    .catch(error => {
      console.error('Error fetching IP address:', error)
      document.getElementById('ip-address').textContent =
        'Error fetching IP address'
    })
  //   }
}
