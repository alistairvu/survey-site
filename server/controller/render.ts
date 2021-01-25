const path = require("path")

// @desc    Load main page
// @param   GET /
const loadMain = (request: any, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../public/main/index.html"))
}

// @desc    Load ask page
// @param   GET /ask
const loadAsk = (request: any, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../public/ask/index.html"))
}

// @desc    Load question page
// @param   GET /question/:id
const loadQuestion = (request: { params: { id: string } }, response: any) => {
  response.sendFile(path.resolve(__dirname, "../../public/question/index.html"))
}

export { loadAsk, loadMain, loadQuestion }
