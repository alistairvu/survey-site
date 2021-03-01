const $askForm = $("#ask-form")
const $askBox = $("#ask-box")
const $charCount = $("#char-count")

const handleSubmit = async (e) => {
  e.preventDefault()
  const content = $askBox.val()
  const question = { content }

  if (content.trim().length > 0) {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        body: new URLSearchParams(question),
      })
      const data = await res.json()
      console.log(data)
      alert("Your question has been posted successfully!")
      $askForm.get(0).reset()
      $charCount.html(`0/200 characters`)
    } catch (err) {
      console.log(err)
    }
  }
}

const countChar = () => {
  const count = $askBox.val().length
  $charCount.html(`<p>${count}/200 characters</p>`)
  if (count >= 190) {
    $charCount.css("color", "red")
  } else {
    $charCount.css("color", "black")
  }
}

$askForm.submit(handleSubmit)
$askBox.on("input", countChar)
