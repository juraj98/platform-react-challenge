import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, getImageById } from "../../../api";
import { Card } from "../../../components/Card";
import { IconClose } from "../../../components/icons/IconClose";
import { IconButton } from "../../../components/IconButton";
import { getImageDataOrPlaceholder } from "../../../utils/image";
import { ErrorMessage } from "../../../components/ErrorMessage";

export interface FavoriteCardProps {
  imageId: string;
  favoriteId: number;
}

export const FavoriteCard = ({ favoriteId, imageId }: FavoriteCardProps) => {
  const queryClient = useQueryClient();
  const { isError, data } = useQuery({
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

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card
      key={favoriteId}
      label={data?.breeds[0]?.name ?? "Unknown"}
      image={getImageDataOrPlaceholder({
        src: data?.url,
        width: data?.width,
        height: data?.height,
        alt: data?.breeds[0]?.name ?? "Cat",
      })}
      link={
        data
          ? {
              href: `/image/${data.id}`,
            }
          : undefined
      }
      button={
        <IconButton
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            deleteMutate();
          }}
          isLoading={isDeleteLoading}
        >
          <IconClose />
        </IconButton>
      }
    />
  );
};
