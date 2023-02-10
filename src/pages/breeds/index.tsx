import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../../api";
import Grid from "../../components/Grid";
import MainLayout from "../../layouts/MainLayout";
import BreedCard from "../../components/cards/BreedCard";
import type { NextPageWithLayout } from "../_app";

const Breeds: NextPageWithLayout = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => getBreeds(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2 className="mb-6 text-xl">Breeds</h2>
      <Grid>
        {data.map((breed) => {
          return <BreedCard key={breed.id} breed={breed} />;
        })}
      </Grid>
    </div>
  );
};

Breeds.getLayout = MainLayout;

export default Breeds;
