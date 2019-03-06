const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.City.find({}, (err, foundCities) => {
      console.log("HELLO");
      if (err) return console.error(err);
      res.json(foundCities);
    });
  },

  showOne: (req, res) => {
    if (req.city.id) {
      db.City.findById(req.cityId, (err, foundCity) => {
        res.json(foundCity);
      });
    } else {
      res.json("No city id provided");
    }
  },
  
};
