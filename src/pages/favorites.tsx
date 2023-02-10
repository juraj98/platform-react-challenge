import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../api";
import Card from "../components/Card";
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
      {
        data.map((favorite) => {
          return <Card
            key={favorite.id}
            image={{
              url: favorite.image.url,
              width: favorite.image.width,
              height: favorite.image.height,
              
            }}
          />
        }
      }
    </div>
  );
};

Favorites.getLayout = MainLayout;

export default Favorites;
