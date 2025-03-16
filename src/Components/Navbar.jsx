import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, setSearchedMovie } from "../redux/slices/moviesSlice";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const response = await dispatch(fetchMovies(searchQuery));
      const movies = response.payload;

      if (movies && movies.length > 0) {
        // Set the first movie in the results as the "searched movie"
        dispatch(setSearchedMovie(movies[0]));
        // Navigate to the searched movie card
        navigate(`/movie/${movies[0].imdbID}`);
      } else {
        alert("No movies found. Try a different search query.");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="right-section">
        <button onClick={() => navigate("/Home")}>Home</button>
        <button onClick={() => navigate("/watchlater")}>Watch Later</button>
        <button onClick={() => navigate("/liked-movies")}>Liked Movies</button>
      </div>
    </nav>
  );
};

export default Navbar;
