import { useEffect } from "react";
import CatCard from "../components/cards/CatCard";
import Grid from "../components/Grid";
import LoadingGrid from "../components/LoadingGrid";
import useCatModal from "../components/modals/useCatModal";
import useHomeImages from "../hooks/useHomeImages";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

export interface HomeProps {
  requiredId?: string;
}

const Home: NextPageWithLayout<HomeProps> = ({ requiredId }) => {
  const { hasNextPage, isError, isLoading, fetchNextPage, images } =
    useHomeImages(requiredId);

  const { Modal, setActiveCatId } = useCatModal(images);

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

  if (isError) {
    return <div>Error</div>;
  }

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
        {Modal}
      </Grid>
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
