const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [
      3,
      "Path `title` (`{VALUE}`) is shorter than the minimum allowed length (3)",
    ],
    required: [true, "Title is required"],
  },
  author: String,
  url: {
    type: String,
    validate: {
      validator: (v) => {
        return /^https?:\/\/.*/i.test(v);
      },
      message: (props) => `${props.value} is not a valid url!`,
    },
    required: [true, "url is required"],
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
