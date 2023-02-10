import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, getImageById } from "../../api";
import Card from "./Card";
import catPlaceholderLg from "../../assets/images/cat-placeholder-lg.svg";
import type { ImportedImage } from "../../types";
import IconClose from "../icons/IconClose";
import IconButton from "../IconButton";
import { useState } from "react";

export interface FavoriteCard {
  imageId: string;
  favoriteId: number;
}

const FavoriteCard = ({ favoriteId, imageId }: FavoriteCard) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["images", imageId],
    queryFn: () => getImageById(imageId),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation({
    mutationKey: ["favorites", favoriteId],
    mutationFn: () => deleteFavorite(favoriteId),
    onSettled: () => {
      void queryClient.invalidateQueries(["favorites"]);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card
      key={data.id}
      label={data.breeds[0]?.name || "Unknown"}
      image={{
        url: data.url,
        width: data.width,
        height: data.height,
        alt: data.breeds[0]?.name || "Cat",
        placeholder: (catPlaceholderLg as ImportedImage).src,
      }}
      link={{
        href: `/images/${data.id}`,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
      }}
      button={
        <IconButton onClick={() => deleteMutate()} isLoading={isDeleteLoading}>
          <IconClose />
        </IconButton>
      }
    />
  );
};

export default FavoriteCard;
