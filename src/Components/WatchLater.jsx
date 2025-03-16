import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./WatchLater.css"; // Import external CSS

const WatchLater = () => {
  const watchLater = useSelector((state) => state.movies.watchLater);

  return (
    <div className="home" style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>

      <h2 className="text-warning mb-4">Watch Later Movies</h2>
      {watchLater.length === 0 ? (
        <div className="text-center">
          <h3 className="text-white">Your Watch Later list is empty!</h3>
          <Link to="/Home" className="btn btn-primary mt-3">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="row">
          {watchLater.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.imdbID}>
              <div className="card h-10 bg-dark text-white">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="btn btn-warning btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
