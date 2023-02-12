import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../../api";
import { Grid } from "../../components/Grid";
import { BreedCard } from "./components/BreedCard";
import { LoadingGrid } from "../../components/LoadingGrid";
import { useBreedModal } from "./useBreedModal";

export const Breeds = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["breeds"],
    queryFn: () => getBreeds(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { node, setBreedModalData } = useBreedModal();

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {node}
      <h2 className="mb-6 text-xl">Breeds</h2>
      <Grid>
        {isLoading ? (
          <LoadingGrid />
        ) : (
          data.map((breed) => {
            return (
              <BreedCard
                key={breed.id}
                breed={breed}
                setBreedModalData={setBreedModalData}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
};
