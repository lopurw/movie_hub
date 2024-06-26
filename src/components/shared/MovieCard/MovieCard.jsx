

import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <div className='rating'>
        <p>{movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
