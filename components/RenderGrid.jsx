import RenderCard from "./RenderCard/index";

const RenderGrid = ({ data }) => {
  return (
    <section role="card-container">
      {data.map((launch, index) => (
        <RenderCard launch={launch} key={index} />
      ))}
    </section>
  );
};

export default RenderGrid;
