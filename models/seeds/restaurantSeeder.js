if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const db = require('../../config/mongoose')
const Restaurant = require("../restaurant")
const restaurants = require('./restaurant.json').results

db.once('open', () => {
  console.log("running restaurantSeeder script...")
  Restaurant.create(restaurants)
  console.log("restaurantSeeder done!")
})
