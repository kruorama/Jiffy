function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function createRequest(searchTerm) {
  // declaring search parameters
  const searchEndpoint = 'https://api.giphy.com/v1/gifs/search?'
  const apiKey = 'FdvMdcL1IDJ80NzsIe4NpJOU3eeO3NNh&q'
  const limit = '50' // number of requested gifs
  const lang = 'en'

  const request = (`${searchEndpoint}api_key=${apiKey}=${searchTerm}&
                  limit=${limit}&offset=0&rating=G&lang=${lang}`)
  return request
}


function createVideoEl(src) {
  const video = document.createElement('video')
  video.src = src
  video.autoplay = true
  video.loop = true
  video.muted = true
  video.className = 'video'
  return video
  console.log('video:' + video)
}

function addVideo(request) {
  fetch(request).then(response => {
    // convert response to json
    return response.json();
  }).then(json => {
    // get the needed gif src
    number = random(1,50)
    const gif = json.data[number]
    const src = gif.images.original.mp4

    const videosEl = document.querySelector('.videos')
    videosEl.appendChild(createVideoEl(src))

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
        request = createRequest(searchTerm)
        addVideo(request)
    }
  }
  searchEl.addEventListener('keyup', doSearch)
}

getInput()
//addVideo(link)
