// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')

const hbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

// setting template engine
app.engine(
  'hbs',
  hbs.engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
  })
)
app.set('view engine', 'hbs')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// routes
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
