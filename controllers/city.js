const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.City.find({}, (err, foundCities) => {
      console.log("HELLO");
      if (err) return console.error(err);
      res.json(foundCities);
    });
  }
};
