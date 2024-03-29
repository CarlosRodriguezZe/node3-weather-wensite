const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Carlos Rodríguez'
    })
} )

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Carlos Rodríguez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Carlos Rodríguez',
        helpText: 'This is some helpful text.'
    })
})

/*app.get('/help', (req, res) => {
    res.send({
        name: 'Carlos',
        age: 25
    }
    [
        {
            name: 'Carlos'
        },
        {
            name: 'Andrew'
        }
    ]
    )
})*/

/*app.get('/about', (req, res) => {
    res.send('<h1> About </h1>')
})*/

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {   

        if (error) 
        {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) 
            {
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast: forecastData })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Carlos Rodríguez',
        errorMsg: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Carlos Rodríguez',
        errorMsg: 'Page not found.'
    })
})

app.listen(port, () => { //method to launch the web app, set in the first param the port
    console.log('Server is up on port ' +port+ ".")
})