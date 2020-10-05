//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")


const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f97e42c79f76fe6dbd418e4caa237631&query='+ lng + 
                    ',' + lat
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error) {
            callback('Unable to find location')
        }else {
            callback(undefined, 'The temperature is: ' + body.current.temperature + ' but it feels like: ' + body.current.feelslike)
        }
    })
}

module.exports = forecast
