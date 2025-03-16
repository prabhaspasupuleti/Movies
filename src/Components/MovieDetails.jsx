import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css"; // Import the external CSS file

const API_KEY = "c0352483";
const BASE_URL = "https://www.omdbapi.com/";

const MovieDetails = () => {
  const { id } = useParams(); // Get the imdbID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem(`reviews-${id}`)) || []
  );
  const [newReview, setNewReview] = useState({ name: "", text: "" });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updatedReviews = [...reviews, { ...newReview, id: Date.now() }];
    setReviews(updatedReviews);
    setNewReview({ name: "", text: "" });
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
  };

  if (loading) {
    return <div className="loading-message">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error-message">Movie details not found.</div>;
  }

  return (
    <div className="movie-details-container">
      <Link to="/Home" className="back-button">
        Back to Home
      </Link>
      <div className="movie-details-row">
        <div className="movie-poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movie-info">
          <h1 className="movie-title">{movie.Title}</h1>
          <p className="movie-plot">{movie.Plot}</p>
          <ul className="movie-details-list">
            <li>
              <strong>Genre:</strong> {movie.Genre}
            </li>
            <li>
              <strong>Director:</strong> {movie.Director}
            </li>
            <li>
              <strong>Cast:</strong> {movie.Actors}
            </li>
            <li>
              <strong>Year:</strong> {movie.Year}
            </li>
            <li>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </li>
          </ul>
        </div>
      </div>

      {/* Review Form */}
      <div className="review-section">
        <h2>Add Your Review</h2>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newReview.name}
            onChange={handleReviewChange}
            required
          />
          <textarea
            name="text"
            placeholder="Your Review"
            value={newReview.text}
            onChange={handleReviewChange}
            required
          />
          <button type="submit" className="submit-button">
            Submit Review
          </button>
        </form>

        {/* Display Reviews */}
        {reviews.length > 0 && (
          <div className="reviews-list">
            <h3>Reviews</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="review-item">
                  <strong>{review.name}</strong>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
