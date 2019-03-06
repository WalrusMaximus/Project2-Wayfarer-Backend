const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("user")
      .populate("city")
      .exec((err, foundPosts) => {
        console.log("HELLO User");
        if (err) return console.error(err);
        res.json(foundPosts);
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
      if (err) return console.log(err);
      res.json(newPostCreated);
    });
  },

  deletePost: (req, res) => {
    let postId = req.body._id;
    db.Post.findOneAndDelete({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
        console.log(foundPost);
      res.json(foundPost);
    });
  },

  // update: (req,res ) => {
  //   let postId = req.params.id;
  //   console.log(reviewId);
  //   db.Post.findOneAndUpdate({ _id: postId }, req.body, (err, updatedPost) => {
  //       if (err) return console.log(err);
  //       console.log(updatedPost);
  //       res.json(updatedPost);
  //   });
  // }
// });
};
