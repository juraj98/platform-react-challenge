import Grid from "./Grid";

const LoadingGrid = () => {
  return (
    <Grid>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card h-52 w-96 animate-pulse bg-gray-200" />
      ))}
    </Grid>
  );
};

export default LoadingGrid;
