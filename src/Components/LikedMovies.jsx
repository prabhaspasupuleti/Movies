import React from "react";
import { useSelector } from "react-redux";

const LikedMovies = () => {
  const { likedMovies } = useSelector((state) => state.movies);

  return (
    <div className="home" style={{ backgroundColor: "black", color: "white"}}>
      <h2 className="text-warning mb-4">Liked Movies</h2>
      <div className="row">
        {likedMovies.length > 0 ? (
          likedMovies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.imdbID}>
              <div className="card h-100 bg-dark text-white">
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No liked movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default LikedMovies;
