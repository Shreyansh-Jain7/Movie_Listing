import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from the backend when the component mounts
    axios.get('https://movie-list-backend-8nzr.onrender.com/mov')
      .then(response => setMovies(response))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Rating: {movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
