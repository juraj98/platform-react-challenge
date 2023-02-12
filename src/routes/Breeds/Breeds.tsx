import { Card } from "components/Card";
import { useCatModal } from "components/CatModal/useCatModal";
import { ErrorMessage } from "components/ErrorMessage";
import { Grid } from "components/Grid";
import { LoadingGrid } from "components/LoadingGrid";
import { useSubId } from "hooks/useSubId";
import { api } from "utils/api";

export const Breeds = () => {
  const subId = useSubId();
  const { isLoading, isError, data } = api.breeds.getListOfBreeds.useQuery(
    {
      subId,
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      refetchOnMount: false,
    }
  );

  const { node, setModalData } = useCatModal({
    showFavoriteButton: false,
    showAdditionalImages: true,
  });

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {node}
      <h2 className="mb-6 text-xl">Breeds</h2>
      <Grid>
        {isLoading ? (
          <LoadingGrid />
        ) : (
          data.map((imageData) => {
            return (
              <Card
                className="cursor-pointer"
                key={imageData.id}
                image={imageData.image}
                label={imageData.breed?.name ?? "Unknown breed"}
                onClick={() => setModalData(imageData)}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
};
