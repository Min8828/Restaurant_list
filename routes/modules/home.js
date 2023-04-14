const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

// Read all data
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).lean().exec()
    res.render('index', {
      restaurants
    })
  } catch {
    (err) => console.log(err)
  }
})

module.exports = router
