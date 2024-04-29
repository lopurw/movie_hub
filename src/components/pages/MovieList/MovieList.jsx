// MovieList.js
import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../shared/MovieCard/MovieCard";
import  "../../shared/MovieCard/MovieCard.css";
import Genres from "../../widgets/Genres/Genres";
import Header from "../../widgets/Header/Header";
import Pagination from "../../widgets/Pagination/Pagination"; // Импортируем компонент пагинации

const MovieList = ({
  movies,
  genres,
  handleGenreSelect,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <Header />
      <Genres genres={genres} onSelectGenre={handleGenreSelect} />
      <div className='movie-container'>
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className='link'>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default MovieList;
