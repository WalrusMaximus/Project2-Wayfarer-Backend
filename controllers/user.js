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
                  email: req.body.email,
                  password: hash
                },
                (err, newUser) => {
                  console.log("here is the result", newUser);

                  let user = {
                    email: newUser.email,
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
  }
};
