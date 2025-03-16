import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import LikedMovies from "./Components/LikedMovies";
import WatchLater from "./Components/WatchLater";
import MovieDetails from "./Components/MovieDetails"; // Import the new component

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="All">
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/liked-movies" element={<LikedMovies />} />
          <Route path="/Watchlater" element={<WatchLater />} />
          <Route path="/movie/:id" element={<MovieDetails />} /> {/* Dynamic route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
