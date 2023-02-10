import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api";
import Card from "../components/cards/Card";
import FavoriteCard from "../components/cards/FavoriteCard";
import Grid from "../components/Grid";
import MainLayout from "../layouts/MainLayout";
import { getSubId } from "../utils/getSubId";
import type { NextPageWithLayout } from "./_app";

const Favorites: NextPageWithLayout = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(getSubId()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

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

Favorites.getLayout = MainLayout;

export default Favorites;
