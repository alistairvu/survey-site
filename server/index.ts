import {
  getRandomQuestion,
  addQuestion,
  addVote,
  getQuestionById,
} from "./controller/methods"
import { loadMain, loadAsk, loadQuestion } from "./controller/render"
import express from "express"
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

app.get("/", loadMain)
app.get("/ask", loadAsk)
app.get("/question/:id", loadQuestion)
app.get("/api/random", getRandomQuestion)
app.post("/api/questions", addQuestion)
app.get("/api/questions/:id", getQuestionById)
app.put("/api/vote", addVote)

app.listen(port, () => {
  console.log(`Experience the magic at http://localhost:${port}`)
})
