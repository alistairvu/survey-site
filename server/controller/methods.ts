import asyncHandler from "express-async-handler"
import Question from "../models/Question"

// @desc    Get one question from the pool of questions
// @param   GET /api/random
const getRandomQuestion = asyncHandler(async (request, response) => {
  const questions = await Question.aggregate([{ $sample: { size: 1 } }])
  console.log(questions)
  const question = questions[0]

  response.send({
    success: true,
    data: question,
  })
})

// @desc    Get one question from the pool of questions
// @param   GET /api/questions/:id
const getQuestionById = asyncHandler(
  async (request: { params: any }, response) => {
    const { id } = request.params
    const question = await Question.findById(id)

    if (question) {
      response.send({
        success: true,
        data: question.toJSON(),
      })
    } else {
      response.status(404)
      response.send({
        success: false,
        message: "Question not found",
      })
    }
  }
)

// @desc    Add a question to the pool of questions
// @param   POST /api/questions
const addQuestion = asyncHandler(async (request, response) => {
  const { content }: { content: string } = request.body

  if (!content) {
    response.status(400)
    response.send({
      success: false,
      message: "Invalid request",
    })
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
const addVote = asyncHandler(async (request, response) => {
  const voteReq: Vote = request.body

  if (!voteReq) {
    response.status(403)
    response.send({
      success: false,
      message: "Invalid request",
    })
  } else {
    const { _id, vote } = voteReq
    const matchingQuestion = await Question.findById(_id)

    if (vote === "up") {
      matchingQuestion.upVotes += 1
    } else if (vote === "down") {
      matchingQuestion.downVotes += 1
    }

    await matchingQuestion.save()

    response.send({
      success: true,
      data: matchingQuestion,
    })
  }
})

export { getRandomQuestion, addQuestion, addVote, getQuestionById }
