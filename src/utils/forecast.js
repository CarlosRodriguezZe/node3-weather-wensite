const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b3fe40ad1b5abad81570c6c68e7c2020&query='+ latitude +','+ longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {

        const { current, error:forecastError = undefined } = body

        if(error)
        {
            callback('Unable to connect to forecast services!', undefined)
        }
        else if(forecastError)
        {
            callback('Unable to find location!', undefined)
        }
        else
        {
            const weather = current.weather_descriptions[0] + 
            '. It is currently '+current.temperature+' degrees out. It feels like '+
            current.feelslike+' degrees out.'

            callback(undefined, weather)
        }
    })
}

module.exports = forecast