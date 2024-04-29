import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SimilarMoviesCarousel from "../../widgets/MovieCarousel/SimilarMoviesCarousel";
import "./MoviePage.css"; // Импорт стилей для MoviePage

const MoviePage = () => {
  const apiKey = "abb6168465d6c86c7bb93c0cdc086fd1"; // Замени на свой API ключ
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ru-RU`
        );
        const data = await response.json();
        setMovie(data);

        // Получаем ключ официального трейлера фильма
        const trailerKey = await fetchTrailerKey(movieId);
        setTrailerKey(trailerKey);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  // Функция для получения ключа официального трейлера фильма
  async function fetchTrailerKey(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=ru-RU`;
    const response = await fetch(url);
    const data = await response.json();
    const officialTrailer = data.results.find(video => video.type === 'Trailer');
    if (officialTrailer) {
      return officialTrailer.key; // Возвращаем ключ официального трейлера
    } else {
      return null; // Если официальный трейлер не найден, возвращаем null
    }
  }

  // Функция для формирования URL официального трейлера
  function getTrailerUrl(trailerKey) {
    if (trailerKey) {
      return `https://www.youtube.com/watch?v=${trailerKey}`;
    } else {
      return null; // Если ключ не найден, возвращаем null
    }
  }

  // Функция для открытия официального трейлера в полноэкранном режиме
  const openTrailerFullscreen = () => {
    if (trailerKey) {
      window.open(getTrailerUrl(trailerKey), "_blank");
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="movie-page">
        <div className="movie-details">
          <div className="img__container" onClick={openTrailerFullscreen}>
           
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <button className="watch-trailer-button" onClick={openTrailerFullscreen}>
              Смотреть трейлер
            </button>
          </div>

          <div className="movie-details-info">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Длительность: {movie.runtime} мин</p>
            <p>Жанр: {movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>Рейтинг: {movie.vote_average}</p>
          </div>
        </div>
      </div>

      <SimilarMoviesCarousel movieId={movieId} />
    </>
  );
};

export default MoviePage;
