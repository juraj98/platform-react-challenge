import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { NormalizedCatData } from "../../../api";
import { deleteFavorite, getFavorites, setFavorite } from "../../../api";
import { getSubId } from "../../../utils/getSubId";
import IconHeart from "../../icons/IconHeart";
import classNames from "classnames";
import { useMemo } from "react";
import IconButton from "../../IconButton";

export interface CatFavoriteButtonProps {
  catData: NormalizedCatData;
}

const CatFavoriteButton = ({ catData }: CatFavoriteButtonProps) => {
  const queryClient = useQueryClient();
  const subId = getSubId();

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
    () => favoritesData?.find((favorite) => favorite.image.id === catData.id),
    [catData, favoritesData]
  );

  const onClick = () => {
    if (favorite) deleteFavoriteMutate(favorite.id);
    else setFavoriteMutate(catData.id);
  };

  const isLoading = isSetLoading || isDeleteLoading;

  return (
    <IconButton disabled={isFetching} onClick={onClick} isLoading={isLoading}>
      <IconHeart
        className={classNames(
          "stroke-primary",
          favorite ? "fill-primary" : "fill-transparent"
        )}
      />
    </IconButton>
  );
};
export default CatFavoriteButton;
