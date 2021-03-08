import asyncHandler from "express-async-handler"
import Question from "../models/Question"
import createError from "http-errors"

interface Vote {
  _id: string
  vote: "up" | "down"
}

// @desc    Get one random question from the pool of questions
// @param   GET /api/random
const getRandomQuestion = asyncHandler(async (request, response, next) => {
  const questions = await Question.aggregate([{ $sample: { size: 1 } }])
  console.log(questions)
  const question = questions[0]

  response.send({
    success: true,
    data: question,
  })
})

// @desc    Get all questions from the pool of questions
// @param   GET /api/questions
const getAllQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.find({})

  res.send({
    success: true,
    data: questions,
  })
})

// @desc    Get one question from the pool of questions
// @param   GET /api/questions/:id
const getQuestionById = asyncHandler(
  async (req: { params: any }, res, next) => {
    const { id } = req.params
    const question = await Question.findById(id)

    if (question) {
      res.send({
        success: true,
        data: question.toJSON(),
      })
    } else {
      throw createError(404, "Question not found")
    }
  }
)

// @desc    Get one question with the most upvotes from the pool of questions
// @param   GET /api/questions/top
const getTopQuestion = asyncHandler(async (req: { params: any }, res, next) => {
  const questions = await Question.find({})
    .sort({ upVotes: -1, downVotes: 1 })
    .limit(1)
  const question = questions[0]

  if (question) {
    res.send({
      success: true,
      data: question,
    })
  } else {
    throw createError(404, "Question not found")
  }
})

// @desc    Get all questions matching a keyword
// @param   GET /api/questions/search
export const searchQuestions = asyncHandler(async (req, res, next) => {
  console.log(req.query.keyword)

  const keyword = req.query.keyword
    ? {
        content: { $regex: `${req.query.keyword}`, $options: "ig" },
      }
    : {}

  console.log(keyword)

  const questions = await Question.find(keyword).sort({
    upVotes: -1,
    downVotes: 1,
  })

  console.log(questions)

  res.send({
    success: true,
    data: questions,
  })
})

// @desc    Add a question to the pool of questions
// @param   POST /api/questions
const addQuestion = asyncHandler(async (request, response, next) => {
  const { content }: { content: string } = request.body

  if (!content) {
    throw createError(400, "Invalid request")
  } else {
    const newQuestion = await Question.create({ content: content })

    response.send({
      success: true,
      data: newQuestion.toJSON(),
    })
  }
})

// @desc    Add a vote
// @param   PUT /api/vote
const addVote = asyncHandler(async (request, response, next) => {
  const voteReq: Vote = request.body

  if (!voteReq) {
    throw createError(403, "Invalid request")
  }
  const { _id, vote } = voteReq
  const matchingQuestion = await Question.findByIdAndUpdate(
    _id,
    {
      $inc: { [`${vote}Votes`]: 1 },
    },
    { new: true }
  )

  if (!matchingQuestion) {
    throw createError(404, "No matching questions found")
  }

  await matchingQuestion.save()

  response.send({
    success: true,
    data: matchingQuestion.toJSON(),
  })
})

// @desc    Delete one question from the pool of questions
// @param   DELETE /api/questions/:id
const deleteQuestionById = asyncHandler(
  async (req: { params: any }, res, next) => {
    const { id } = req.params
    const question = await Question.findById(id)

    if (!question) {
      throw createError(404, "Question not found")
    }

    await question.remove()
  }
)

// @desc    Teapot - may be short and stout
// @param   GET /api/teapot
const teapot = asyncHandler(async (request, response, next) => {
  throw createError(
    418,
    "This is a teapot. The resulting entity body MAY be short and stout."
  )
})

export {
  getRandomQuestion,
  getTopQuestion,
  addQuestion,
  addVote,
  getQuestionById,
  getAllQuestions,
  deleteQuestionById,
  teapot,
}
