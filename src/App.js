import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import LikedMovies from "./Components/LikedMovies";
import WatchLater from "./Components/WatchLater";
import MovieDetails from "./Components/MovieDetails";
import "./App.css";

const App = () => {
  return (
    <Router basename="/Movies">
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/Home" replace />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/liked-movies" element={<LikedMovies />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<Navigate to="/Home" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
