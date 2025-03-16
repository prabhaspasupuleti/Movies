import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGenre, addToWatchLater, addToLikedMovies } from "../redux/slices/moviesSlice";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the updated CSS

const genres = ["Action", "Comedy", "Drama", "Thriller", "Fantasy"];

const Home = () => {
  const dispatch = useDispatch();
  const { moviesByGenre } = useSelector((state) => state.movies);

  useEffect(() => {
    genres.forEach((genre) => {
      dispatch(fetchMoviesByGenre(genre));
    });
  }, [dispatch]);

  const handleWatchLater = (movie) => {
    dispatch(addToWatchLater(movie));
  };

  const handleLikeMovie = (movie) => {
    dispatch(addToLikedMovies(movie));
  };

  return (
    <div className="home" style={{ backgroundColor: "black", color: "white", padding: "20px" }}>
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to Movie Explorer</h1>
        <p>
          Discover movies by genres, add them to your watchlist, or mark them as your favorites.
          Dive into your next cinematic adventure!
        </p>
        <div className="genre-navigation">
          {genres.map((genre) => (
            <a key={genre} href={`#${genre}`} className="genre-link">
              {genre}
            </a>
          ))}
        </div>
      </div>

      {/* Movies by Genre */}
      {genres.map((genre) => (
        <div key={genre} id={genre} className="genre-section mb-5">
          <h2 className="genre-title mb-4">{genre} Movies</h2>
          <div className="row">
            {moviesByGenre[genre] &&
              moviesByGenre[genre].map((movie) => (
                <div className="col-md-3 mb-4" key={movie.imdbID}>
                  <div className="card movie-card h-100">
                    <img
                      src={movie.Poster}
                      className="card-img-top"
                      alt={movie.Title}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.Title}</h5>
                      <p className="card-text">Year: {movie.Year}</p>
                      <Link
                        to={`/movie/${movie.imdbID}`}
                        className="btn btn-primary btn-sm mb-2"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-secondary btn-sm mb-2"
                        onClick={() => handleWatchLater(movie)}
                      >
                        Watch Later
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleLikeMovie(movie)}
                      >
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
