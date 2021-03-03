const mongoose = require("mongoose")
const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const Question = mongoose.model("Question", questionSchema)
module.exports = Question
