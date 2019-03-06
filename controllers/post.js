const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("user")
      .exec((err, foundPosts) => {
        console.log("HELLO User");
        if (err) return console.error(err);
        res.json(foundPosts);
      });

    db.Post.find({})
      .populate("city")
      .exec((err, foundCity) => {
        console.log("HELLO City");
        if (err) return console.error(err);
        res.json(foundCity);
      });
  },
  createPost: (req, res) => {
    let newPost = new db.Post({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      city: req.body.city,
      userName: req.body.userName
    });
    db.Post.create(newPost, (err, newPostCreated) => {
      res.json(newPostCreated);
    });
  }
};
