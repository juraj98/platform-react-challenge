import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { deleteFavorite, getFavorites, setFavorite } from "../../../api";
import { useSubId } from "../../../hooks/useSubId";

export const useCatFavorite = (catId: string | null) => {
  const queryClient = useQueryClient();
  const subId = useSubId();

  const { data: favoritesData, isFetching } = useQuery(["favorites"], () =>
    getFavorites(subId)
  );

  const { mutate: setFavoriteMutate, isLoading: isSetLoading } = useMutation(
    (catId: string) => setFavorite(catId, subId),
    { onSettled: () => void queryClient.invalidateQueries(["favorites"]) }
  );

  const { mutate: deleteFavoriteMutate, isLoading: isDeleteLoading } =
    useMutation((favoriteId: number) => deleteFavorite(favoriteId), {
      onSettled: () => void queryClient.invalidateQueries(["favorites"]),
    });

  const favorite = useMemo(
    () => favoritesData?.find((favorite) => favorite.image.id === catId),
    [catId, favoritesData]
  );

  const onClick = useCallback(() => {
    if (!catId) return;

    if (favorite) deleteFavoriteMutate(favorite.id);
    else setFavoriteMutate(catId);
  }, [catId, deleteFavoriteMutate, favorite, setFavoriteMutate]);

  return {
    onClick,
    isFetching,
    isLoading: isSetLoading ?? isDeleteLoading,
    isFavorite: Boolean(favorite),
  };
};
