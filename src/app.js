const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/foreCast')


const port = process.env.PORT || 3000
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDir))
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialDir)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Harshal'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "No address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            console.log("forecastData", forecastData)
            res.send({
                forecast: forecastData.summary,
                maxTemp: forecastData.temperatureMax,
                minTemp: forecastData.temperatureMin,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Harshal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help..?',
        name: 'Harshal'
    })
})

app.get('/products', (req, res) =>{

    console.log("req.query.search", req.query.search)

    if(!req.query.search){
        return res.send({
            error: "No search term"
        })
    }

    res.send({
        products: []
    })
})

app.get('/error404', (req, res) => {
    res.render('index', {
        title: 'Error',
        name: 'Harshal'
    })
})

app.get('/error404/*', (req, res)=>{   
    res.render('error404')
})

app.get('/weather?*', (req, res)=>{   
    res.render('error404')
})

app.get('*', (req, res)=>{
    res.render('error404')
})

app.listen(port, () =>{
    console.log("started", port)
})