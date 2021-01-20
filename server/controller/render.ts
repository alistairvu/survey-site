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

export { loadAsk, loadMain }
