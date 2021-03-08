const $container = $("#container")

const fetchTeapot = async () => {
  try {
    await $.ajax({
      url: `/api/teapot`,
      type: "GET",
    })
  } catch (err) {
    $container.html(`<strong><h3>${err.responseJSON.message}</h3></strong>`)
    return
  }
}

$(document).ready(() => {
  fetchTeapot()
})
