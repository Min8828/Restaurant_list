// use dotenv while in informal env
if (process.env.NODE_ENV !== "production") require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const engine = require("express-handlebars").engine;
const Restaurant = require("./models/restaurant");

const app = express();
const port = 3000;

// setting template engine
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts", 
    defaultLayout: "main",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");

// setting static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => console.log('mongodb error!')) // 連線異常
db.once('open', () => console.log('mongodb connected!')) // 連線成功

app.get("/", (req, res) => {
  res.render("index", { restaurants });
});
app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurantId = Number(req.params.restaurant_id);
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );
  res.render("show", { restaurant });
});

app.get("/search", (req, res) => {
  if (!req.query.keyword) return res.redirect("/");

  // search by name or category of restaurant
  const keyword = req.query.keyword.trim().toLowerCase();
  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword)
  );

  res.render("index", { restaurants: filteredRestaurants, keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
