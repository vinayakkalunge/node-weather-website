const path = require('path')                            // npm path module provides utilities for working with file and directory paths.
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))  

//Setup route handler
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Vinayak'
    })
})

app.get('/about', (req, res) => {                          
    res.render('about',{
        title: 'About Me',
        name: 'Vinayak K'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some helpful text.',
        title: 'Help!',
        name: 'Vinayak Kalunge'
    })
})

//-----------------------------------------------------------------------------------------------------------------------------------
// app.get('', (req, res) => {                             //serve as index.html
//     res.send('<h1>Hello express!</h1>')                 //Never run as express is going to work through the app until it finds a match for that route. 
// })                                                      //In this case of our Express static call it is indeed going to find a match -> /public/index.html (root URL)

// app.get('/help', (req, res) => {                                             // serve as help.html
//     res.send([{name: 'Vinayak', age: 24}, {name: 'Pallu', age: 19}])        
// })

// app.get('/about', (req, res) => {                          //serve as about.html
//     res.send('<h1>About</h1>')
// })
//-----------------------------------------------------------------------------------------------------------------------------------
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {       //set default value for object destructuring to handle the undefined
        if(error){
            return res.send({ error })
        } 

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vinayak Kalunge',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vinayak Kalunge',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})