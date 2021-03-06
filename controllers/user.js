const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  index: (req, res) => {
    db.User.find({}, (err, foundUsers) => {
      if (err) return console.error(err);
      res.json(foundUsers);
    });
  },
  showOne: (req, res) => {
    /* if (req.params.user) */

    // {
    db.User.find({ _id: req.params.id }, (err, foundUser) => {
      res.json(foundUser);
    });
    // } else {
    //   res.json("No user id provided");
    // }
  },
  signup: (req, res) => {
    console.log(req.body);

    db.User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "email already exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log("hashing error:", err);
              res.status(200).json({ error: err });
            } else {
              db.User.create(
                {
                  name: req.body.name,
                  userName: req.body.userName,
                  email: req.body.email,
                  password: hash
                },
                (err, newUser) => {
                  let user = {
                    name: newUser.name,
                    email: newUser.email,
                    userName: newUser.userName,
                    _id: newUser._id
                  };

                  jwt.sign(
                    user,
                    "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=",
                    {
                      expiresIn: "1h"
                    },
                    (err, signedJwt) => {
                      // send signed jwt
                      res.status(200).json({
                        message: "User Created",
                        user,
                        signedJwt
                      });
                    }
                  );
                }
              );
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  },
  login: (req, res) => {
    console.log("Login called");
    console.log(req.body);
    db.User.find({ email: req.body.email })
      .select("+password")
      .exec()
      .then(users => {
        if (users.length < 1) {
          return res.status(401).json({
            message: "Email or password is incorrect"
          });
        }
        console.log(users[0]);

        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          console.log("checking psw");
          if (err) {
            console.error(err);
            return status(500).json({ err });
          }

          if (match) {
            console.log("matched");
            let user = {
              email: users[0].email,
              _id: users[0]._id
            };
            jwt.sign(
              user,
              "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=",
              {
                expiresIn: "1h"
              },
              (err, signedJwt) => {
                res.status(200).json({
                  message: "Auth Successful",
                  user,
                  signedJwt
                });
              }
            );
          } else {
            console.log("no match");
            res.status(401).json({ message: "Email or password is incorrect" });
          }
        });
      })
      .catch(err => {
        res.status(500).json({ err });
      });
  },
  delete: (req, res) => {
    console.log(req.body);
    let userId = req.body._id;
    db.User.findOneAndDelete({ _id: userId }, (err, foundUser) => {
      if (err) {
        throw err;
      }
      res.json(foundUser);
    });
  },
  update: (req, res) => {
    let userId = req.body._id;
    db.User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true },
      (err, updatedUser) => {
        if (err) return console.log(err);
        console.log(updatedUser);
        res.json(updatedUser);
      }
    );
  }
};
