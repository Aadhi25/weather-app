const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.get("/", async (req, res) => {
  // Get the placename from frontend
  const { placeName } = req.query;
  if (placeName.length >= 3) {
    try {
      const result = await axios.request({
        method: "get",
        maxBodyLength: Infinity,
        url: `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${placeName}`,
      });
      res.status(200).json(result.data);
    } catch (error) {
      res.json({
        msg: "No matches Found",
      });
    }
  } else {
    res.json({
      msg: "No matches Found, type atleast 3 character",
    });
  }
});

// /weather route

app.get("/weather", async (req, res) => {
  // Get the placename from frontend
  const { weatherPlace } = req.query;
  if (weatherPlace.length === 0)
    return res
      .status(400)
      .json({ errMsg: "please type in a location to see the weather data" });
  try {
    const result = await axios.request({
      method: "get",
      maxBodyLength: Infinity,
      url: `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${weatherPlace}`,
    });
    res.json(result.data);
  } catch (error) {
    res.json({
      errMsg: "No matching location found",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is up and running on " + process.env.PORT);
});

module.exports = {
  app,
};
