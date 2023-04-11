// use dotenv while in informal env
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const Restaurant = require("./models/restaurant");

const app = express();
const port = 3000;

// setting template engine
app.engine(
  "hbs",
  hbs.engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// setting static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI); // 設定連線到 mongoDB
const db = mongoose.connection; // 取得資料庫連線狀態
db.on("error", () => console.log("mongodb error!")); // 連線異常
db.once("open", () => console.log("mongodb connected!")); // 連線成功

// Read all data
app.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).lean().exec();
    res.render("index", {
      restaurants,
    });
  } catch {
    (err) => console.log(err);
  }
});

// Create
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

app.post("/restaurants", (req, res) => {
  const data = req.body;

  return Restaurant.create(data)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

// Read one data
app.get("/restaurants/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const restaurant = await Restaurant.findById(_id);
    res.render("detail", { restaurant });
  } catch {
    (err) => console.log(err);
  }
});

// Edit
app.get("/restaurants/:_id/edit", (req, res) => {
  const _id = req.params._id;
  return Restaurant.findById(_id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

app.post("/restaurants/:_id/edit", async (req, res) => {
  try {
    const _id = req.params._id;
    const restaurant = req.body;
    const updateRestaurant = await Restaurant.findOneAndUpdate(
      { _id },
      restaurant
    ).exec();
    await updateRestaurant.save();
    res.redirect(`/restaurants/${_id}`);
  } catch {
    (err) => console.log(err);
  }
});

// Delete
app.post("/restaurants/:_id/delete", async (req, res) => {
  try {
    const _id = req.params._id;
    await Restaurant.findOneAndDelete({ _id });
    res.redirect("/");
  } catch {
    (err) => console.log(err);
  }
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
