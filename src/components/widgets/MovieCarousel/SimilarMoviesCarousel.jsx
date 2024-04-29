import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../shared/MovieCard/MovieCard";
import "./SimilarMoviesCarousel.css";

const SimilarMoviesCarousel = ({ movieId }) => {
  const apiKey = "abb6168465d6c86c7bb93c0cdc086fd1";
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=ru-RU`
        );
        const data = await response.json();
        setSimilarMovies(data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  return (
    <div className="similar-movies-carousel">
      {similarMovies.length > 0 && <h2>Похожие фильмы</h2>}
      <div className="similar-movies-container">
        <div className="similar-movies">
          {similarMovies.map((similarMovie) => (
            <Link key={similarMovie.id} to={`/movie/${similarMovie.id}`}>
              <MovieCard movie={similarMovie} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarMoviesCarousel;
