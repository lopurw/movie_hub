
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "./components/widgets/Header/Header";
import Genres from "./components/widgets/Genres/Genres";
import MovieList from "./components/pages/MovieList/MovieList";
import Pagination from "./components/widgets/Pagination/Pagination";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviePage from "./components/pages/MoviePage/MoviePage";
import "./App.css";

const apiKey = "abb6168465d6c86c7bb93c0cdc086fd1";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=ru-RU`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ru-RU&page=${currentPage}`;
        if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ru-RU&sort_by=popularity.desc&page=${currentPage}&with_genres=${selectedGenre}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre]);

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMovieClick = (movie) => {
    
  };

  return (
    <Router>
      {isLoading && (
        <div className="loading-indicator">
          <CircularProgress
            style={{
              color: "rgb(44, 50, 76)",
              width: "100px",
              height: "100px",
            }}
          />
        </div>
      )}
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                movies={movies}
                genres={genres}
                handleGenreSelect={handleGenreSelect}
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            }
          />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
