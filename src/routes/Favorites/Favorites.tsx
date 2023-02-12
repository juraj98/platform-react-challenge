import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getFavorites } from "../../api";
import { FavoriteCard } from "./components/FavoriteCard";
import { Grid } from "../../components/Grid";
import { LoadingGrid } from "../../components/LoadingGrid";
import { useSubId } from "../../hooks/useSubId";
import { ErrorMessage } from "../../components/ErrorMessage";

export const Favorites = () => {
  const subId = useSubId();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(subId),
  });

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) return <LoadingGrid />;

  if (data?.length === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="text-xl">You have saved images</h2>
        <p className="text-sm text-gray-500">
          You can add images to your favorites by clicking the heart icon on the
          image page.
        </p>
        <Link href="/">
          <button className="btn mt-6">Browse images</button>
        </Link>
      </div>
    );

  return (
    <div>
      <h2 className="mb-6 text-xl">Favorites</h2>
      <Grid>
        {data.map((favorite) => (
          <FavoriteCard
            favoriteId={favorite.id}
            imageId={favorite.image_id}
            key={favorite.id}
          />
        ))}
      </Grid>
    </div>
  );
};
