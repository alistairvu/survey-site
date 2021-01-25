import "/components/app-header.js"

const container = document.getElementById("container")

const fetchQuestion = async () => {
  try {
    const id = window.location.pathname.split("/")[2]
    const res = await fetch(`http://localhost:6960/api/get-question/${id}`)
    const { data, success } = await res.json()
    console.log(success)

    if (success) {
      const { upVote, downVote, content } = data
      const upPercent = (upVote / (upVote + downVote)) * 100 || 0
      const downPercent = 100 - upPercent || 0

      container.innerHTML = `
    <div class="confirm-text">
      <p>The question "${content}" has been upvoted ${upVote} ${
        upVote === 1 ? "time" : "times"
      } (<span style="color: rgb(0, ${
        (255 * upPercent) / 100
      }, 0);">${upPercent.toFixed(2)}%</span>) and downvoted ${downVote} ${
        downVote === 1 ? "time" : "times"
      } (<span style="color: rgb(${
        (255 * downPercent) / 100
      }, 0, 0);">${downPercent.toFixed(2)}%</span>).</p>
      <button id="reload-btn" style="margin-top: 10px;">New question</button>
    </div>`

      document
        .getElementById("reload-btn")
        .addEventListener(
          "click",
          () => (location.href = "http://localhost:6960")
        )
    } else {
      container.innerHTML = `<h3>Question not found</h3>`
    }
  } catch (err) {
    console.log(err)
  }
}

fetchQuestion()
