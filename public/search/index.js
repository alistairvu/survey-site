const $searchForm = $("#search-form")
const $searchBox = $("#search-box")
const $resultsDisplay = $("#results-display")

const findQuestion = async (e) => {
  e.preventDefault()
  $resultsDisplay.html(
    `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    </div>`
  )

  const searchQuery = $searchBox.val()
  const { data } = await $.ajax({
    url: `/api/questions/search?keyword=${searchQuery}`,
    method: "GET",
  })

  console.log(data)

  $resultsDisplay.html(`
  <ul class="list-group" id="results-display">
    
  </ul>
  `)

  data.forEach((item) => {
    const itemHTML = `<li key="${item._id}" class="list-group-item">
      ${item.content}
      <span class="badge badge-primary" style="background-color:green;">${item.upVotes}</span>      
      <span class="badge badge-primary" style="background-color:red;">${item.downVotes}</span>
    </li>`
    $("#results-display").append(itemHTML)
  })
}

$searchForm.on("submit", findQuestion)
