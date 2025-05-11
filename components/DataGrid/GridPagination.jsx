import styles from "@/styles/Home.module.css";

const GridPagination = ({ page, setPage, totalPages }) => {
  const disabledPrevious = page <= 0;
  const disabledNext = page >= totalPages - 1;

  return (
    <div
      id="grid-pagination"
      data-testid="grid-pagination"
      className={styles["grid-pagination"]}
    >
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={disabledPrevious}
        data-testid="previous-button"
      >
        ←
      </button>
      <span>
        {page + 1} / <span data-testid="total-pages">{totalPages}</span>
      </span>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
        disabled={disabledNext}
        data-testid="next-button"

      >
        →
      </button>
    </div>
  );
};

export default GridPagination;
