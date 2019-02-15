const link = 'https://api.giphy.com/v1/gifs/search?api_key=FdvMdcL1IDJ80NzsIe4NpJOU3eeO3NNh&q=doggo&limit=25&offset=0&rating=G&lang=en'

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createVideo(src) {
  const video = document.createElement('video')
  video.src = src
  video.autoplay = true
  video.loop = true
  video.muted = true
  video.className = 'video'

  return video
}

function addVideo(link) {
  fetch(link).then(response => {
    // convert response to json
    return response.json();
  }).then(json => {
    // get the needed gif src
    const gif = json.data[0]
    const src = gif.images.original.mp4

    const videosEl = document.querySelector('.videos')
    videosEl.appendChild(createVideo(src))

  }).catch(error => {
    // here we can handle fails
  })

}
addVideo(link)
