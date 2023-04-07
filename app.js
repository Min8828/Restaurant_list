const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json').results
const port = 3000

// setting template engine
app.engine(
  'handlebars',
  exphbs.engine({
    layoutsDir: 'views/layouts', // directory to handlebars files
    defaultLayout: 'main',
    extname: 'handlebars'
  })
)
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = Number(req.params.restaurant_id)
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  )
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) return res.redirect('/')

  // search by name or category of restaurant
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  )

  res.render('index', { restaurants: filteredRestaurants, keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
