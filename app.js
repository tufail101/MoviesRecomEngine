const api_key = "c8a70cb7";
const baseUrl = "https://www.omdbapi.com/";
const movieList = document.getElementById("movieList");

const searchBtn = document.getElementById("searchBtn");

const showMovies = async (movies) => {
  movieList.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.dataset.imdbID = movies.imdbID;
    movieCard.classList.add("card");
    movieCard.setAttribute("id", "movieCard");

    movieCard.classList.add("movieCard");
    movieCard.innerHTML = `<img src="${movie.Poster} alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <h5>${movie.Year}</h5>
       `;

    movieList.appendChild(movieCard);
    movieCard.addEventListener("click", () => {
      fetchMovieDetails(movie.imdbID);
    });
  });
};

const fetchMovieByQuery = async (query) => {
  document.getElementById("srchMv").innerHTML = "";
  let response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=c8a70cb7`
  );

  let data = await response.json();
  if (data.Response === "True") {
    let movies = data.Search;
    showMovies(movies);
  } else {
    movieList.innerHTML = `<p>Movie Not Found</p>`;
  }
};
searchBtn.addEventListener("click", () => {
  event.preventDefault();
  const query = document.getElementById("search").value.trim();
  if (query) {
    fetchMovieByQuery(query);
  }

  // console.log(query);
});
const ShowMoviesOnHomePage = async () => {
  let response = await fetch(
    "https://www.omdbapi.com/?s=best&y=2024&apikey=c8a70cb7"
  );

  let data = await response.json();
  let movies = data.Search;
  showMovies(movies);
};

function fetchMovieDetails(imdbID) {
  movieList.innerHTML = "";
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=c8a70cb7`)
    .then((response) => response.json())
    .then((movie) => {
      movieList.innerHTML = `
      <div class='dataCont my-4 mx-2 px-5 py-2'>
        <div>
        <img src="${movie.Poster}" alt="${movie.Title}">
        </div>
        <div class='movdata mx-3 my-3'>
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
        </div>
       </div>
      `;
    })
    .catch((error) => console.error("Error:", error));
}

window.onload = ShowMoviesOnHomePage;
