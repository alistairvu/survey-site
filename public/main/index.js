import "/components/app-header.js"
const container = document.getElementById("container")
let id

const fetchQuestion = async () => {
  try {
    const res = await fetch("http://localhost:6960/api/get-question")
    const { data } = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const addEventListeners = () => {
  const upButton = document.getElementById("up-vote")
  const downButton = document.getElementById("down-vote")
  const newButton = document.getElementById("new-question")
  const resultButton = document.getElementById("results-btn")
  upButton.addEventListener("click", () => getVote("up", id))
  downButton.addEventListener("click", () => getVote("down", id))
  newButton.addEventListener("click", reloadQuestion)
  resultButton.addEventListener(
    "click",
    () => (location.href = `http://localhost:6960/question/${id}`)
  )
}

const getQuestion = async () => {
  try {
    const data = await fetchQuestion()
    const { _id, content } = data
    id = _id

    container.innerHTML = `<h3 id="question">${content}</h3>
  <div id="results">
    <div id="vote-btn">
      <button id="up-vote">UP</button>
      <button id="down-vote">DOWN</button>
    </div>
    <div id="other-btn">
      <button id="results-btn">View results</button>
      <button id="new-question">New question</button>
    </div>
  </div>`
  } catch (error) {
    console.log(error)
  }
}

const getVote = async (type, id) => {
  try {
    const questionContent = document.getElementById("question").innerHTML
    const bodyData = { _id: id, vote: type }
    const res = await fetch("http://localhost:6960/api/add-vote", {
      method: "PUT",
      body: new URLSearchParams(bodyData),
    })
    const { data } = await res.json()

    const { upVote, downVote } = data
    const upPercent = (upVote / (upVote + downVote)) * 100
    const downPercent = 100 - upPercent

    container.innerHTML = `
    <div class="confirm-text">
      <h3>Thank you for voting!</h3> 
      <p>The question "${questionContent}" has been upvoted ${upVote} ${
      upVote === 1 ? "time" : "times"
    } (<span style="color: rgb(0, ${
      (255 * upPercent) / 100
    }, 0);">${upPercent.toFixed(2)}%</span>) and downvoted ${downVote} ${
      downVote === 1 ? "time" : "times"
    } (<span style="color: rgb(${
      (255 * downPercent) / 100
    }, 0, 0);">${downPercent.toFixed(2)}%</span>).</p>
    </div>
    <button id="reload-btn">New question</button>`

    document
      .getElementById("reload-btn")
      .addEventListener("click", () => location.reload())
  } catch (error) {
    console.log(error)
  }
}

const reloadQuestion = async () => {
  try {
    const { _id, content } = await fetchQuestion()
    document.getElementById("question").innerHTML = content
    id = _id
    addEventListeners()
  } catch (err) {
    console.log(err)
  }
}

const showData = async () => {
  await getQuestion()
  addEventListeners()
}

showData()
