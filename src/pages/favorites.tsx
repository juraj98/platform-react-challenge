import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api";
import FavoriteCard from "../components/cards/FavoriteCard";
import Grid from "../components/Grid";
import LoadingGrid from "../components/LoadingGrid";
import { useSubId } from "../hooks/useSubId";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Favorites: NextPageWithLayout = () => {
  const subId = useSubId();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(subId),
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2 className="mb-6 text-xl">Favorites</h2>
      <Grid>
        {isLoading ? (
          <LoadingGrid />
        ) : (
          data.map((favorite) => (
            <FavoriteCard
              favoriteId={favorite.id}
              imageId={favorite.image_id}
              key={favorite.id}
            />
          ))
        )}
      </Grid>
    </div>
  );
};

Favorites.getLayout = MainLayout;

export default Favorites;
