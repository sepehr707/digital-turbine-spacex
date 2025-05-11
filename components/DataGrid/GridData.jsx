import RenderGrid from "../RenderGrid";
import styles from "@/styles/Home.module.css";

const GridData = ({ pagedData }) => {
  return (
    <div id="grid-data" data-testid="grid-data" className={styles["grid-data"]}>
      <RenderGrid data={pagedData} />
    </div>
  );
};

export default GridData;
