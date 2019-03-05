const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.Post.find({})
    .populate('user')
    .exec((err, foundPosts) => {
      console.log("HELLO");
      if (err) return console.error(err);
      res.json(foundPosts);
    });
  }
};
