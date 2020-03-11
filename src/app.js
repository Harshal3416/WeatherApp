const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/foreCast')

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
        title: 'Weather',
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

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About me',
        name: 'Harshal'
    })
})

app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help me',
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

app.listen(3000, () =>{
    console.log("started")
})