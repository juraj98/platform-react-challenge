import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, getFavorites, setFavorite } from "../../../api";
import { getSubId } from "../../../utils/getSubId";
import { Collapse } from "../../Collapse";
import IconHeart from "../../icons/IconHeart";
import cx from "classnames";
import type { ImageCardProps } from "../ImageCard";
import { useMemo } from "react";

export const ImageCardFavoriteButton = ({
  catData,
  expanded,
}: ImageCardProps) => {
  const queryClient = useQueryClient();
  const subId = getSubId();

  const { data: favoritesData, isFetching: isFetchingFavorites } = useQuery(
    ["favorites"],
    () => getFavorites(subId)
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

  const isLoading = isSetLoading || isDeleteLoading || isFetchingFavorites;

  return (
    <Collapse
      direction="horizontal"
      expandedClassName="pl-4"
      expanded={expanded}
    >
      <button
        onClick={onClick}
        className={cx("btn-ghost btn-circle btn", isLoading && "loading")}
      >
        {!isLoading && (
          <IconHeart
            className={cx(
              "stroke-primary",
              favorite ? "fill-primary" : "fill-transparent"
            )}
          />
        )}
      </button>
    </Collapse>
  );
};
