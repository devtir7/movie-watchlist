const searchFormEl = document.getElementById('search-form')
const inputEl = document.getElementById('search')
const mainEl = document.getElementById('main')

searchFormEl.addEventListener('submit', function(e) {
    e.preventDefault()

    const searchTitle = inputEl.value

    fetch(`http://www.omdbapi.com/?apikey=ee63cf7&s=${searchTitle}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderResults(data)
        })
})

function renderResults(data) {
    let resultsHtml = ''
    
    fetch(`http://www.omdbapi.com/?apikey=ee63cf7&i=${data.Search[0].imdbID}`)
        .then(res => res.json())
        .then(data => console.log(data))
    
    for (let i=0; i<data.Search.length; i++) {
        resultsHtml += `
        <div class="container">
            <img class="movie-poster" src="${data.Search[i].Poster}">

            <div class="sub-container">
                <div class="movie-header">
                    <h2 class="movie-title">${data.Search[i].Title}</h2>
                    <img class="movie-rating-icon" src="../images/star.png">
                    <p class="movie-rating">${data.Search[i].imdbRating}</p>
                </div>

                <div class="movie-bio">
                            <p class="movie-duration">${data.Search[i].Runtime}</p>
                            <p class="movie-genres">${data.Search[i].Genre}</p>
                            <p class="waitlist-add">
                                <img class="add-icon" src="../images/add-icon.png">
                            Watchlist</p>
                </div>

                <div class="movie-desc">
                    <p>${data.Search[i].Plot}</p>
                </div>
            </div>
        </div>
    `
    }

    mainEl.innerHTML = resultsHtml
}

// http://www.omdbapi.com/?i=tt3896198&apikey=ee63cf7