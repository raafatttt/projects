import React from "react";

import StarIcon from "@mui/icons-material/Star";
function MoviesInfo(props) {
  const firstMovie = props.movies[1];
  if (!props.searchPerformed) {
    return <p>Enter a Movie name.</p>;
  }

  return (
    <>
      <div className="MoviesInfo">
        <img src={firstMovie?.Poster} alt="movie" />
        <div className="MovieDetails">
          <h1>{firstMovie?.Title}</h1>
          <h3>
            <StarIcon sx={{ color: "#ffbc23" }} />
            {firstMovie.imdbRating}
          </h3>
          <h2>{firstMovie.Year}</h2>
          <div className="GenresContainer">
            {firstMovie.Genre.split(",").map((genre) => (
              <p className="Genre">{genre.trim()}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="PlotCast">
        <br />
        <p>
          <span className="Plot">Plot: </span>
          <br />
          {firstMovie.Plot}
        </p>
        <br />
        <p>
          <span className="Actors">Actors: </span>
          <br />
          {firstMovie.Actors}
        </p>
      </div>
    </>
  );
}

export default MoviesInfo;
