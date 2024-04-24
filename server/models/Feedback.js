const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  feedbackType: {
    type: String,
    required: true,
    enum: ["Bugs", "Feedback", "Query"],
  },
  feedbackMessage: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
