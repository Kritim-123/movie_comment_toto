const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },

  videoUniqueId: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // who made the comment

  text: {
    type: String,
    required: true,
    trim: true,
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of users who liked it

  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: { type: String, required: true, trim: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
