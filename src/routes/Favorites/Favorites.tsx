import { ErrorMessage } from "components/ErrorMessage";
import { LoadingGrid } from "components/LoadingGrid";
import { MasonryGrid } from "components/MasonryGrid";
import { useSubId } from "hooks/useSubId";
import Link from "next/link";
import { FavoriteCard } from "routes/Favorites/components/FavoriteCard";
import { api } from "utils/api";

export const Favorites = () => {
  const subId = useSubId();

  const { isLoading, refetch, isError, data } =
    api.favorites.getFavorites.useQuery({ subId }, { enabled: Boolean(subId) });

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
      <MasonryGrid
        items={data.map((favorite) => ({
          size: {
            width: favorite.imageData.image.width,
            height: favorite.imageData.image.height,
          },
          element: (
            <FavoriteCard
              refetchFavorites={() => void refetch()}
              key={favorite.id}
              favorite={favorite}
            />
          ),
        }))}
      />
    </div>
  );
};
