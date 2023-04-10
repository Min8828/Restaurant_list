if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const mongoose = require('mongoose')
const Restaurant = require("../restaurant"); // 載入 restaurant model
const restaurants = require('./restaurant.json').results

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => {
  console.log('mongodb connected!')
  restaurants.forEach((restaurant) => {
    Restaurant.create(restaurant)
  })
  console.log('done')
})
