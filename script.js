const API_URL = "https://api.themoviedb.org/3/movie/550?api_key=c3640f557afea59cda51eac36c9b1a8e";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=c3640f557afea59cda51eac36c9b1a8e&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// get movies from API

getMovies(API_URL);
async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    displayMovies(data.results);
    console.log(data.results);
}

function displayMovies(movies) {
    main.innerHTML='';
    movies.forEach(movie => {
        const {title, poster_path, overview, vote_average} = movie;
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");
        movieDiv.innerHTML = `
            <img src="${IMAGE_PATH}${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassesByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
            </div>
        `;
        main.appendChild(movieDiv);
    })
}


function getClassesByRating(rating) {
    if(rating >= 8) {
        return "green";
    }else if(rating >= 5) {
        return "orange";
    }else{
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = search.value;
    if (searchText && searchText !== "") {
        const url = SEARCH_URL + searchText;
        getMovies(url);
        searchText='';
    }else{
        window.location.reload();
    }
});