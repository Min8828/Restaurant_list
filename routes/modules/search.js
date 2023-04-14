const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

router.get('/', async (req, res) => {
  if (!req.query.keyword) return res.redirect('/')

  // search by name or category of restaurant
  const keyword = req.query.keyword.trim().toLowerCase()

  try {
    const restaurants = await Restaurant.find({}).lean().exec()
    const filteredRestaurants = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword)
    )

    res.render('index', { restaurants: filteredRestaurants, keyword })
  } catch {
    (err) => console.log(err)
  }
})

module.exports = router
