const $container = $("#container")

const fetchQuestion = async () => {
  try {
    const id = window.location.pathname.split("/")[2]
    const { success, data } = await $.ajax({
      url: `/api/questions/${id}`,
      type: "GET",
    })

    if (success) {
      const { upVote, downVote, content } = data
      const upPercent = (upVote / (upVote + downVote)) * 100 || 0
      const downPercent = 100 - upPercent || 0

      $container.html(`
      <div id="container">
    <div class="confirm-text">
      <p>The question "${content}" has been upvoted ${upVote} ${
        upVote === 1 ? "time" : "times"
      } (<span style="color: green;">${upPercent.toFixed(
        2
      )}%</span>) and downvoted ${downVote} ${
        downVote === 1 ? "time" : "times"
      } (<span style="color: red;">${downPercent.toFixed(2)}%</span>).</p>
      <button id="reload-btn" class="btn btn-primary">New question</button>
    </div>
    </div>`)

      $("#reload-btn").click(() => (location.href = "http://localhost:6960"))
    } else {
      $container.html(`<div id="container"><h3>Question not found</h3></div>`)
    }
  } catch (err) {
    console.log(err)
  }
}

$(document).ready(() => {
  fetchQuestion()
})
