//------MODULES
const express = require("express");
const home_route = new express.Router();
const fs = require("fs");


home_route.get("/", (req, res) => {
  const available_units = [];
  fs.readdirSync(`${__dirname}/../../client/data/`).forEach((file) => {
    available_units.push(file.replace(".json", ""));
  });
  res.render("home", { available_units });
});

module.exports = home_route;
