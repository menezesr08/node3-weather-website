const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVuZXplc3IwOCIsImEiOiJja2Ztaml3aDQwMWYwMnlvZWU5c2xxZThmIn0.fZtH_iZ6ipJKCOLrkE6r2w&limit=1'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            // dont need to add undefined here but we can
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode