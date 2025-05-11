import React, { useEffect, useState } from "react";
import GridData from "./GridData";
import GridPagination from "./GridPagination";
import styles from "@/styles/Home.module.css";

function DataGrid({ data }) {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pagedData, setPagedData] = useState([]);

  useEffect(() => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const dataSlice = data.slice(start, end);
    setPagedData(dataSlice);
  }, [page, data, itemsPerPage]);

  useEffect(() => {
    const calculateGrid = () => {
      const rowHeight = 510;
      const itemWidth = 300;
      const paddingPercent = 10;

      const rows = Math.floor(window.innerHeight / rowHeight);
      const cols = Math.floor(
        (window.innerWidth * (100 - paddingPercent)) / 100 / itemWidth
      );

      setItemsPerPage(rows * cols);
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  useEffect(() => {
    if (itemsPerPage > 0) {
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } else {
      setTotalPages(1);
    }
    setPage(0);
  }, [data, itemsPerPage]);

  return (
    <div id="grid" className={styles.grid}>
      <GridData pagedData={pagedData} />
      <GridPagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}

export default DataGrid;
