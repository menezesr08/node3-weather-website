const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPaths = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rohan Menezes'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Rohan Menezes'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Rohan Menezes'
    })
})

// localhost:3000/weather
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Rohan Menezes'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Rohan Menezes'
    })
})

// localhost:3000
// req - info about the incoming request to server
// res - customise what we send back to requester
// app.get('', (req, res) => {
//     res.send('Hello express');
// })
// ---- routes ------

// localhost:3000/help
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Rohan',
//         age: '23'
//     }, {
//         name:'Test',
//         age: '1'
//     }]);
// })
// // localhost:3000/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

