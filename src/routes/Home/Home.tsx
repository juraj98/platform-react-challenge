import { Card } from "components/Card";
import { useCatModal } from "components/CatModal/useCatModal";
import { ErrorMessage } from "components/ErrorMessage";
import { LoadingGrid } from "components/LoadingGrid";
import { MasonryGrid } from "components/MasonryGrid";
import { NonRedirectLink } from "components/NonRedirectLink";
import { useHomeInfiniteScroll } from "routes/Home/useHomeInfiniteScroll";
import type { NormalizedImageData } from "server/api/routers/images";

export interface HomeProps {
  imageFromUrl?: NormalizedImageData;
}

export const Home = ({ imageFromUrl }: HomeProps) => {
  const { setModalData, node: modalNode } = useCatModal({
    showFavoriteButton: true,
    showAdditionalImages: false,
    initialData: imageFromUrl,
  });

  const {
    isError,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    isLoading,
    images,
  } = useHomeInfiniteScroll(setModalData, imageFromUrl);

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

  const displayLoadingGrid = isLoading || (isFetching && !isFetchingNextPage);

  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
      {displayLoadingGrid ? (
        <LoadingGrid />
      ) : (
        <MasonryGrid
          items={
            images?.map((imageData, index) => {
              return {
                size: {
                  width: imageData.image.width,
                  height: imageData.image.height,
                },
                element: (
                  <NonRedirectLink
                    key={`${index}-${imageData.id}`}
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
                ),
              };
            }) ?? []
          }
        />
      )}
      {!displayLoadingGrid && fetchNextPageIndicator}
      {modalNode}
    </div>
  );
};
