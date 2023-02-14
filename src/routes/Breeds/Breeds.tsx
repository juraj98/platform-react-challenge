import { Card } from "components/Card";
import { useCatModal } from "components/CatModal/useCatModal";
import { ErrorMessage } from "components/ErrorMessage";
import { LoadingGrid } from "components/LoadingGrid";
import { MasonryGrid } from "components/MasonryGrid";
import { useSubId } from "hooks/useSubId";
import { api } from "utils/api";

export const Breeds = () => {
  const subId = useSubId();
  const { isFetching, isLoading, isError, data } =
    api.breeds.getListOfBreeds.useQuery(
      {
        subId,
      },
      {
        refetchOnWindowFocus: true,
        keepPreviousData: false,
        refetchOnMount: true,
        enabled: Boolean(subId),
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
      {isFetching || isLoading ? (
        <LoadingGrid />
      ) : (
        <MasonryGrid
          items={data.map((imageData) => ({
            size: {
              width: imageData.image.width,
              height: imageData.image.height,
            },
            element: (
              <Card
                className="cursor-pointer"
                key={imageData.id}
                image={imageData.image}
                label={imageData.breed?.name ?? "Unknown breed"}
                onClick={() => setModalData(imageData)}
              />
            ),
          }))}
        />
      )}
    </div>
  );
};
