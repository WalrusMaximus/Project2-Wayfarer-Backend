const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wayfarer");

module.exports = {
  User: require("./User"),
  Post: require("./Post"),
  City: require("./City")
};
