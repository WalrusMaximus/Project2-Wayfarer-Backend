const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.User.find({}, (err, foundUsers) => {
      console.log("HELLO");
      if (err) return console.error(err);
      res.json(foundUsers);
    });
  }
};
