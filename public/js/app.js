console.log('Client side javascript file is loaded')

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})*/

/*const m = fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/boston.json?access_token=pk.eyJ1IjoiY2FybG9yb3plIiwiYSI6ImNsYzlqeHFwMDNzZmEzb3BqaTg5cGs4a2MifQ.99w-aUlIaHi-XAKSDZS3pA&limit=1')

m.then((response) => {
    response.json().then((data) => {
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
        const n = fetch('http://api.weatherstack.com/current?access_key=b3fe40ad1b5abad81570c6c68e7c2020&query='+ latitude +','+ longitude + '&units=f')
        n.then((response) => {
            response.json().then(({location, current} = {}) => {
                console.log(location.name)
                console.log(current.weather_descriptions[0] + '. Temperature: '+current.temperature + ' degrees out. It feels like: '+current.feelslike+ ' degrees out.')
            })
        })
    })
})*/

/*
const m = fetch('http://localhost:3000/weather?address=boston')
m.then((response) => {
    response.json().then(({error, location, forecast}) => {
        error?console.log(error):
        (console.log(location),
        console.log(forecast))
    })
})
*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const m = fetch('/weather?address=' +location)
    m.then((response) => {
        response.json().then(({error, location, forecast}) => {
            error?(messageOne.textContent = error, messageTwo.textContent = ''):
            (messageOne.innerHTML = location,
            messageTwo.innerHTML = forecast)
        })
    })
})
