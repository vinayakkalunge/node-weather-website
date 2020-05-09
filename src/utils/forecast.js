const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0501f10653c7d012b9b7eb0f41dc0f9&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature +" degrees out. There is a "+ body.current.feelslike + "% chance of rain.")
        }
    })
}

module.exports = forecast