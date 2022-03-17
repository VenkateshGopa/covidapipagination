const express = require('express');
const route = express.Router();
const services = require('../services/countryservices')

route.get('/country' , services.countries);

route.post('/add', services.addcountry)

route.post('/addmultiple', services.addmultiplecountries)

module.exports= route;