import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite, getImageById } from "../../api";
import Card from "./Card";
import IconClose from "../icons/IconClose";
import IconButton from "../IconButton";
import { getImageDataOrPlaceholder } from "../../utils/image";

export interface FavoriteCardProps {
  imageId: string;
  favoriteId: number;
}

const FavoriteCard = ({ favoriteId, imageId }: FavoriteCardProps) => {
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
    return <div>Error</div>;
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
        <IconButton onClick={() => deleteMutate()} isLoading={isDeleteLoading}>
          <IconClose />
        </IconButton>
      }
    />
  );
};

export default FavoriteCard;
