import { Card } from "components/Card";
import { useCatModal } from "components/CatModal/useCatModal";
import { ErrorMessage } from "components/ErrorMessage";
import { Grid } from "components/Grid";
import { LoadingGrid } from "components/LoadingGrid";
import { NonRedirectLink } from "components/NonRedirectLink";
import { useHomeInfiniteScroll } from "routes/Home/useHomeInfiniteScroll";
import type { NormalizedImageData } from "server/api/routers/images";

export interface HomeProps {
  imageFromUrl?: NormalizedImageData;
}

export const Home = ({ imageFromUrl }: HomeProps) => {
  const { isError, isFetchingNextPage, fetchNextPage, isLoading, images } =
    useHomeInfiniteScroll(imageFromUrl);

  const { setModalData, node: modalNode } = useCatModal({
    showFavoriteButton: true,
    showAdditionalImages: false,
    initialData: imageFromUrl,
  });

  if (isError) {
    return <ErrorMessage />;
  }

  const fetchNextPageIndicator = isFetchingNextPage ? (
    <div className="flex justify-center py-8">
      <progress className="progress w-56" />
    </div>
  ) : (
    <button
      className="btn-ghost btn"
      onClick={() => {
        void fetchNextPage();
      }}
    >
      Load more
    </button>
  );

  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
      {isLoading ? (
        <LoadingGrid />
      ) : (
        <Grid>
          {images?.map((imageData) => {
            return (
              <NonRedirectLink
                key={imageData.id}
                href={`/image/${imageData.id}`}
                onClick={() => {
                  setModalData(imageData);
                }}
              >
                <Card
                  image={imageData.image}
                  label={imageData.breed?.name || "Unknown breed"}
                />
              </NonRedirectLink>
            );
          })}
        </Grid>
      )}
      {!isLoading && fetchNextPageIndicator}
      {modalNode}
    </div>
  );
};
