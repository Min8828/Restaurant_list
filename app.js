// use dotenv while in informal env
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
const routes = require("./routes")

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

// mongoDB
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

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
