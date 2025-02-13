import { Card } from "components/Card";
import { IconButton } from "components/IconButton";
import { IconClose } from "components/icons/IconClose";
import Link from "next/link";
import { api } from "utils/api";
import type { FavoriteData } from "server/api/routers/favorites";
import { useSubId } from "hooks/useSubId";
import { useState } from "react";

export interface FavoriteCardProps {
  favorite: FavoriteData;
  refetchFavorites: () => void;
}

export const FavoriteCard = ({
  favorite,
  refetchFavorites,
}: FavoriteCardProps) => {
  const subId = useSubId();
  const [hideDeleted, setHideDeleted] = useState(false);

  const { mutate: deleteFavoriteMutate, isLoading: isDeleteFavoriteMutate } =
    api.favorites.deleteFavorite.useMutation({
      onSuccess: () => {
        setHideDeleted(true);
        refetchFavorites();
      },
    });

  if (hideDeleted) return null;

  return (
    <Link key={favorite.id} href={`image/${favorite.imageData.id}`}>
      <Card
        image={favorite.imageData.image}
        label={favorite.imageData.breed?.name || "Unknown breed"}
        button={
          <IconButton
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              deleteFavoriteMutate({ favoriteId: favorite.id, subId });
            }}
            isLoading={isDeleteFavoriteMutate}
          >
            <IconClose />
          </IconButton>
        }
      />
    </Link>
  );
};
