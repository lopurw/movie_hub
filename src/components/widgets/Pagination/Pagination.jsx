
import Button from "../../shared/Button/Button";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Предыдущая
      </Button>
      <span>Страница {currentPage} из {totalPages}</span>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Следующая
      </Button>
    </div>
  );
};

export default Pagination;
