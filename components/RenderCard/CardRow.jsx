const RowCard = ({ title, value, titleOnTop, color }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: titleOnTop ? "column" : "row",
        justifyContent: titleOnTop ? "flex-start" : "space-between",
        padding: "1px 2px",
        gap: 2,
      }}
    >
      <p
        style={{
          fontWeight: "bold",
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontStyle: "italic",
          ...(color && { color: color }),
        }}
      >
        {value}
      </p>
    </div>
  );
};

export default RowCard;
