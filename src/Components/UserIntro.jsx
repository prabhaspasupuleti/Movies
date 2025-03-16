import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserIntro.css"; // Optional for styling
import "./Home";

const UserIntro = () => {
  const navigate = useNavigate();

  const handleBrowseMovies = () => {
    navigate("/Home");
  };

  return (
    <div className="user-intro-container">
      <div className="intro-content">
        <h1 className="welcome-title">Welcome to Movie Explorer!</h1>
        <p className="intro-text">
          Discover a wide range of movies from various genres. Whether you're a fan of action, comedy, drama, or thrillers, our platform has something for everyone. Dive into the world of cinema and explore your favorite movies with ease.
        </p>
        <button className="browse-movies-button" onClick={handleBrowseMovies}>
          Browse Movies
        </button>
      </div>
    </div>
  );
};
export default UserIntro;
