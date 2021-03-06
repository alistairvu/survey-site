import Store from "./store.js"

const SET = "SET"

const idReducer = (state = { id: "" }, action) => {
  switch (action.type) {
    case SET: {
      return { id: action.payload }
    }
    default: {
      return state
    }
  }
}

const idStore = Store.createStore(idReducer)

const setId = (id) => ({ type: SET, payload: id })

// Main app
const $container = $("#container")

const fetchQuestion = async () => {
  try {
    const { data } = await $.ajax({
      type: "GET",
      url: "/api/random",
    })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const handleUpVote = () => getVote("up")
const handleDownVote = () => getVote("down")
const handleResults = () =>
  (location.href = `/question/${idStore.selector((state) => state.id)}`)

const addEventListeners = () => {
  $("#up-vote").click(handleUpVote)
  $("#down-vote").click(handleDownVote)
  $("#new-question").click(reloadQuestion)
  $("#results-btn").click(handleResults)
  $("#delete-btn").click(deleteHandler)
}

const getQuestion = async () => {
  try {
    const data = await fetchQuestion()
    const { _id, content } = data
    idStore.dispatch(setId(_id))

    $container.html(`<h3 id="question" class="font-weight-bold">${content}</h3>
  <div id="results">
    <div id="vote-btn">
      <button id="up-vote" class="btn btn-success">UP</button>
      <button id="down-vote" class="btn btn-danger">DOWN</button>
    </div>
    <div id="other-btn">
      <button id="results-btn" class="btn btn-primary">View results</button>
      <button id="new-question" class="btn btn-primary">New question</button>
      <button id="delete-btn" class="btn btn-danger">Delete question</button>
    </div>
  </div>`)
  } catch (error) {
    console.log(error)
  }
}

const getVote = async (type) => {
  try {
    const questionContent = document.getElementById("question").innerHTML
    const bodyData = { _id: idStore.selector((state) => state.id), vote: type }
    console.log(bodyData)

    const { data } = await $.ajax({
      url: "/api/vote",
      type: "PUT",
      data: bodyData,
    })

    const { upVotes, downVotes } = data
    const upPercent = (upVotes / (upVotes + downVotes)) * 100
    const downPercent = 100 - upPercent

    $container.html(`
    <div class="confirm-text">
      <h3>Thank you for voting!</h3> 
      <p>The question "${questionContent}" has been upvoted ${upVotes} ${
      upVotes === 1 ? "time" : "times"
    } (<span style="color: green;">${upPercent.toFixed(
      2
    )}%</span>) and downvoted ${downVotes} ${
      downVotes === 1 ? "time" : "times"
    } (<span style="color: red;">${downPercent.toFixed(2)}%</span>).</p>
    </div>
    <button id="reload-btn" class="btn btn-primary">New question</button>`)

    $("#reload-btn").click(() => location.reload())
  } catch (error) {
    console.log(error)
  }
}

const deleteHandler = async () => {
  try {
    await $.ajax({
      url: `/api/questions/${idStore.selector((state) => state.id)}`,
      type: "DELETE",
      success: () => {
        console.log("success")
        $container.html("<h3>Questions deleted!</h3>")
      },
      complete: () => {
        alert("Deleted!")
      },
    })
    $container.html("<h3>Questions deleted!</h3>")
  } catch (error) {
    console.log(error)
  }
}

const reloadQuestion = async () => {
  try {
    const { _id, content } = await fetchQuestion()
    document.getElementById("question").innerHTML = content
    idStore.dispatch(setId(_id))
  } catch (err) {
    console.log(err)
  }
}

$(document).ready(async () => {
  await getQuestion()
  addEventListeners()
})
