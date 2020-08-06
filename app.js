const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require("./movies-data-small.json");
require("dotenv").config();

const app = express();

const movies = [
  { title: "The Big Lebowski" },
  { title: "A Bug's Life" },
  { title: "Gravity" },
];

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  // move to the next middleware
  next();
});

function handleGetReq(req, res) {
  res.send(movies);
}

app.get("/movie", handleGetReq);

module.exports = app;
