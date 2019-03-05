const mongoose = require("mongoose");
Schema = mongoose.Schema;
// const Post = require("./Post");

const UserSchema = new Schema({
  name: String,
  email: String, // Validate as email
  userName: String,
  password: String,
  avatarUrl: String,
  homeCity: {
    type: Schema.Types.ObjectId,
    ref: "City"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
