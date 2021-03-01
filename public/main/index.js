// RTK
const RTK = window.RTK
const idSlice = RTK.createSlice({
  name: "id",
  initialState: "",

  reducers: {
    setId: (_, action) => action.payload,
  },
})

const { setId } = idSlice.actions
const store = RTK.configureStore({
  reducer: idSlice.reducer,
})

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
const handleResults = () => (location.href = `api/question/${store.getState()}`)

const addEventListeners = () => {
  $("#up-vote").click(handleUpVote)
  $("#down-vote").click(handleDownVote)
  $("#new-question").click(reloadQuestion)
  $("#results-btn").click(handleResults)
}

const getQuestion = async () => {
  try {
    const data = await fetchQuestion()
    const { _id, content } = data
    store.dispatch(setId(_id))

    $container.html(`<h3 id="question" class="font-weight-bold">${content}</h3>
  <div id="results">
    <div id="vote-btn">
      <button id="up-vote" class="btn btn-success">UP</button>
      <button id="down-vote" class="btn btn-danger">DOWN</button>
    </div>
    <div id="other-btn">
      <button id="results-btn" class="btn btn-primary">View results</button>
      <button id="new-question" class="btn btn-primary">New question</button>
    </div>
  </div>`)
  } catch (error) {
    console.log(error)
  }
}

const getVote = async (type) => {
  try {
    const questionContent = document.getElementById("question").innerHTML
    const bodyData = { _id: store.getState(), vote: type }
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

const reloadQuestion = async () => {
  try {
    const { _id, content } = await fetchQuestion()
    document.getElementById("question").innerHTML = content
    store.dispatch(setId(_id))
  } catch (err) {
    console.log(err)
  }
}

$(document).ready(async () => {
  await getQuestion()
  addEventListeners()
})
