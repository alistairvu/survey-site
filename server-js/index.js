const {
  getRandomQuestion,
  addQuestion,
  getQuestionById,
  addVote,
} = require("./controller/methods")
const { loadMain, loadAsk, loadQuestion } = require("./controller/render")
const express = require("express")
const path = require("path")
const db = require("./db")
const dotenv = require("dotenv")

dotenv.config()
db.default()

const app = express()
const port = 6960
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
