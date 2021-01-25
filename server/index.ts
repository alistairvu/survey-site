import {
  getRandomQuestion,
  addQuestion,
  addVote,
  getQuestionById,
} from "./controller/methods"
import { loadMain, loadAsk, loadQuestion } from "./controller/render"
const express = require("express")
const path = require("path")

const app = express()
const port: number = 6960

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, "../public")))

app.get("/", loadMain)
app.get("/ask", loadAsk)
app.get("/question/:id", loadQuestion)
app.get("/api/get-question", getRandomQuestion)
app.get("/api/get-question/:id", getQuestionById)
app.post("/api/add-question", addQuestion)
app.put("/api/add-vote", addVote)

app.listen(port, (err: any) => {
  if (err) throw err
  console.log(`Experience the magic at http://localhost:${port}`)
})
