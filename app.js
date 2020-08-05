const express = require("express");
const morgan = require("morgan");

const app = express();

const movies = [
  { title: "The Big Lebowski" },
  { title: "A Bug's Life" },
  { title: "Gravity" },
];

app.use(morgan("dev"));

function handleGetReq(req, res) {
  res.json(movies).send();
}

app.get("/movies", handleGetReq);

module.exports = app;
