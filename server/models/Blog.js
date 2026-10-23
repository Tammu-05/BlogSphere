
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: 150,
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
    },

    excerpt: {
      type: String,
      maxlength: 300,
      default: "",
    },

    author: {
      type: String,
      required: true,
      trim: true,
      default: "Anonymous",
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    category: {
      type: String,
      required: true,
      default: "General",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
