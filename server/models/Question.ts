import mongoose from "mongoose"

interface QuestionSchema extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId
  content: string
  upVotes: number
  downVotes: number
}

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

const Question = mongoose.model<QuestionSchema>("Question", questionSchema)
export default Question
