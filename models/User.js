const mongoose = require("mongoose");
Schema = mongoose.Schema;
// const Post = require("./Post");

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  userName: String,
  password: { type: String, required: true, select: false },
  avatarUrl: String,
  homeCity: {
    type: Schema.Types.ObjectId,
    ref: "City"
  }
});

UserSchema.set("toJSON", {
  transform: function(doc, ret, opt) {
    delete ret["password"];
    return ret;
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
