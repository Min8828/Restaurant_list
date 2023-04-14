const router = require('express').Router()
const Restaurant = require('../../models/restaurant')

// Create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body

  return Restaurant.create(data)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

// Read one data
router.get('/:_id', async (req, res) => {
  try {
    const _id = req.params._id
    const restaurant = await Restaurant.findById(_id)
    res.render('detail', { restaurant })
  } catch {
    (err) => console.log(err)
  }
})

// Edit
router.get('/:_id/edit', (req, res) => {
  const _id = req.params._id
  return Restaurant.findById(_id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:_id', async (req, res) => {
  try {
    const _id = req.params._id
    const restaurant = req.body
    const updateRestaurant = await Restaurant.findOneAndUpdate(
      { _id },
      restaurant
    ).exec()
    await updateRestaurant.save()
    res.redirect(`/restaurants/${_id}`)
  } catch {
    (err) => console.log(err)
  }
})

// Delete
router.delete('/:_id', async (req, res) => {
  try {
    const _id = req.params._id
    await Restaurant.findOneAndDelete({ _id })
    res.redirect('/')
  } catch {
    (err) => console.log(err)
  }
})

module.exports = router
