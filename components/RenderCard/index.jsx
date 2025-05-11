import Image from "next/image";
import styles from "@/styles/Home.module.css";
import RowCard from "./CardRow";

const RenderCard = ({ launch }) => {
  const formatedDate = (date) => {
    return date.slice(0, 10).split("-").reverse().join("-");
  };

  const status = launch.success ? "success" : "failure";
  return (
    <>
      <article key={launch.id} className={styles.launch_card}>
        <Image
          className={styles.img}
          src={launch.links.patch.small}
          alt="Rocket Patch"
          width={200}
          height={200}
        />
        <h2>{launch.name} </h2>
        <div className={styles.card__content}>
          <RowCard title={"Date"} value={formatedDate(launch.date_utc)} />
          <RowCard
            title={"Launch Status"}
            value={status}
            color={status === "success" ? "#93c47d" : "#e06666"}
          />
          {!launch.success && (
            <RowCard
              title={"Failure Reason"}
              value={launch.failures[0].reason}
              titleOnTop
            />
          )}
          {launch.details && (
            <RowCard title="Details" value={launch.details} titleOnTop />
          )}
        </div>
      </article>
    </>
  );
};

export default RenderCard;
