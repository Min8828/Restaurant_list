if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const db = require('../../config/mongoose')
const Restaurant = require("../restaurant")
const restaurants = require('./restaurant.json').results

db.once('open', () => {
  restaurants.forEach((restaurant) => {
    Restaurant.create(restaurant)
  })
  console.log('done')
})
