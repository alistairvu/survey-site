import {
  getRandomQuestion,
  addQuestion,
  addVote,
  getQuestionById,
  teapot,
  getAllQuestions,
  deleteQuestionById,
  getTopQuestion,
  searchQuestions,
} from "./controller/methods"
import {
  loadMain,
  loadAsk,
  loadQuestion,
  loadTeapot,
  loadSearch,
} from "./controller/render"
import express, { Request, Response, NextFunction } from "express"
import path from "path"
import connectDB from "./db"
import dotenv from "dotenv"

dotenv.config()
connectDB()

const app = express()
const port: number = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "../public")))

app.route("/").get(loadMain)
app.route("/ask").get(loadAsk)
app.route("/search").get(loadSearch)
app.route("/question/:id").get(loadQuestion)
app.route("/teapot").get(loadTeapot)
app.route("/api/random").get(getRandomQuestion)
app.route("/api/questions").post(addQuestion).get(getAllQuestions)
app.route("/api/questions/top").get(getTopQuestion)
app.route("/api/questions/search").get(searchQuestions)
app.route("/api/questions/:id").get(getQuestionById).delete(deleteQuestionById)
app.route("/api/vote").put(addVote)
app.route("/api/teapot").get(teapot)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.json({ success: false, message: err.message })
})

app.listen(port, () => {
  console.log(`Experience the magic at http://localhost:${port}`)
})
