require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/urlShortenRoutes");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

mongoose.connect(
  process.env.DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  () => console.log("DB connected!")
);

app.get("/", (req, res) => res.render("index"));
app.use(urlRoutes);
app.use((req, res) => res.send("Page not found"));

app.listen(port);
