const mongoose = require("mongoose");
Schema = mongoose.Schema;
// const City = require("./City");

const PostSchema = new Schema({
  title: String,
  content: String,
  date: String,
  city: {
    type: Schema.Types.ObjectId,
    ref: "City"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Post", PostSchema);
