import { useCallback, useEffect } from "react";
import CatCard from "../components/cards/CatCard";
import Grid from "../components/Grid";
import LoadingGrid from "../components/LoadingGrid";
import useCatModal from "../components/modals/catModal/useCatModal";
import useHomeImages from "../hooks/useHomeImages";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const SCROLL_THRESHOLD = 500;

export interface HomeProps {
  requiredId?: string;
}

const Home: NextPageWithLayout<HomeProps> = ({ requiredId }) => {
  const { isFetchingNextPage, isError, isLoading, fetchNextPage, images } =
    useHomeImages(requiredId);

  const { node, setActiveCatId } = useCatModal(images, requiredId);

  useEffect(() => {
    if (!window) return undefined;

    const callback = (event: PopStateEvent) => {
      const state = event.state as { catId?: string };

      setActiveCatId(state.catId || null);
    };

    window.addEventListener("popstate", callback);

    return () => {
      window.removeEventListener("popstate", callback);
    };
  }, [setActiveCatId]);

  const onScrollListener = useCallback(() => {
    if (isFetchingNextPage) return;

    if (
      window.scrollY >
      document.body.scrollHeight - window.innerHeight - SCROLL_THRESHOLD
    ) {
      void fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!document) return undefined;

    document.addEventListener("scroll", onScrollListener as EventListener);

    return () => {
      document.removeEventListener("scroll", onScrollListener as EventListener);
    };
  }, [onScrollListener]);

  if (isError) {
    return <div>Error</div>;
  }

  const loadMore = isFetchingNextPage ? (
    <div className="flex justify-center py-8">
      <progress className="progress w-56" />
    </div>
  ) : (
    <button
      className="btn-ghost btn"
      onClick={() => {
        void fetchNextPage();
      }}
    >
      Load more
    </button>
  );

  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
      <Grid>
        {isLoading ? (
          <LoadingGrid />
        ) : (
          images?.map((catData, index) => (
            <CatCard
              setActiveCatId={setActiveCatId}
              key={`${index}-${catData.id}`}
              catData={catData}
            />
          ))
        )}
        {node}
      </Grid>
      {!isLoading && loadMore}
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
