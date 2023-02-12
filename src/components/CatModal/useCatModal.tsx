import { CatModal } from "components/CatModal/CatModal";
import { useSubId } from "hooks/useSubId";
import { useMemo, useState } from "react";
import type { NormalizedImageData } from "server/api/routers/images";
import { api } from "utils/api";

export interface UseCatModalOptions {
  showFavoriteButton?: boolean;
  showAdditionalImages?: boolean;
  initialData?: NormalizedImageData;
}

export const useCatModal = ({
  showFavoriteButton = true,
  showAdditionalImages = true,
  initialData,
}: UseCatModalOptions) => {
  const subId = useSubId();
  const [imageData, setImageData] = useState<NormalizedImageData | null>(
    initialData ?? null
  );

  const {
    data: favorites,
    isFetching,
    isLoading,
    refetch,
  } = api.favorites.getFavorites.useQuery(
    {
      subId,
    },
    { enabled: Boolean(subId) }
  );

  const favorite = favorites?.find(
    (favorite) => favorite.imageData.id === imageData?.id
  );

  const { mutate: setFavoriteMutate, isLoading: isSetFavoriteLoading } =
    api.favorites.setFavorite.useMutation({
      onSuccess: () => refetch(),
    });
  const { mutate: deleteFavoriteMutate, isLoading: isDeleteFavoriteMutate } =
    api.favorites.deleteFavorite.useMutation({
      onSuccess: () => refetch(),
    });

  const favoriteButton = useMemo(() => {
    if (!showFavoriteButton || imageData === null) return undefined;

    return {
      onClick: () => {
        if (favorite) deleteFavoriteMutate({ subId, favoriteId: favorite.id });
        else setFavoriteMutate({ subId, imageId: imageData.id });
      },
      isLoading: favorite
        ? isDeleteFavoriteMutate
        : isSetFavoriteLoading || isLoading,
      isFetching,
      isFavorite: Boolean(favorite),
    };
  }, [
    showFavoriteButton,
    imageData,
    favorite,
    isDeleteFavoriteMutate,
    isSetFavoriteLoading,
    isLoading,
    isFetching,
    deleteFavoriteMutate,
    subId,
    setFavoriteMutate,
  ]);

  return {
    setModalData: setImageData,
    node: imageData ? (
      <CatModal
        onClose={() => {
          window.history.pushState({ href: "/" }, "", "/");
          return setImageData(null);
        }}
        showAdditionalImages={showAdditionalImages}
        favorite={favoriteButton}
        imageData={imageData}
      />
    ) : null,
  };
};
