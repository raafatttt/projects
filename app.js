import React, { useState, useEffect } from "react";
import "./App.css";
import MoviesInfo from "./MoviesInfo";
import axios from "axios";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const getMovieDetails = async (id) => {
    const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson;
  };

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      const movieDetailsPromises = responseJson.Search.map((movie) =>
        getMovieDetails(movie.imdbID)
      );
      const movieDetails = await Promise.all(movieDetailsPromises);
      setMovies(movieDetails);
      setSearchPerformed(true);
    } else {
      setMovies([]);
      setSearchPerformed(false);
    }
  };
  const handleSearch = () => {
    getMovieRequest(searchValue);
  };

  return (
    <>
      <div className={searchPerformed ? "ContainerExpand" : "Container"}>
        <div className="Search-Container">
          <input
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
          />
          <button onClick={handleSearch}>Search</button>
          <MoviesInfo movies={movies} searchPerformed={searchPerformed} />
        </div>
      </div>
    </>
  );
}

export default App;
