const link = 'https://api.giphy.com/v1/gifs/search?api_key=FdvMdcL1IDJ80NzsIe4NpJOU3eeO3NNh&q=doggo&limit=50&offset=0&rating=G&lang=en'

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
    number = random(1,50)
    const gif = json.data[number]
    const src = gif.images.original.mp4

    const videosEl = document.querySelector('.videos')
    videosEl.appendChild(createVideo(src))

  }).catch(error => {
    // here we can handle fails
  })

}

function getInput() {
  const searchEl = document.querySelector('.search-input')
  const hintEl = document.querySelector('.search-hint')
  const doSearch = event => {
    const searchTerm = searchEl.value

    if (searchTerm.length > 2) {
      document.body.classList.add('show-hint')
      hintEl.innerHTML = `Hit Enter to search ${searchTerm}`
    } else {
      document.body.classList.remove('show-hint')
    }
    if (event.key === 'Enter' && searchTerm.length > 2) {
      const link = `https://api.giphy.com/v1/gifs/search?api_key=FdvMdcL1IDJ80NzsIe4NpJOU3eeO3NNh&q=${searchTerm}&limit=50&offset=0&rating=G&lang=en`
      addVideo(link)
    }
  }
  searchEl.addEventListener('keyup', doSearch)
}

getInput()
//addVideo(link)
