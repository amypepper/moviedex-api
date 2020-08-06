const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require("./movies-data-small.json");
require("dotenv").config();

const app = express();

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
  const { genre } = req.query;
  const { country } = req.query;
  const { avg_vote } = req.query;

  let results;

  const searchResults = function () {
    if (genre) {
      results = MOVIEDEX.filter((movie) => movie.genre.toLowerCase() === genre);
    }
    return results;
  };

  res.json(searchResults()).send();
}

app.get("/movie", handleGetReq);

module.exports = app;
