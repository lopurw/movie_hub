
import Button from "../../shared/Button/Button";
import "./Genres.css";

const Genres = ({ genres, selectedGenre, onSelectGenre }) => {
  return (
    <nav className="genres">
      <ul className="genre-list">
        {genres.map((genre) => (
          <li key={genre.id} className="genre-item">
            <Button
              onClick={() => onSelectGenre(genre.id)}
              disabled={selectedGenre === genre.id}
            >
              {genre.name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Genres;
