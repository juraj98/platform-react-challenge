import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { NormalizedCatData } from "../api";
import { getImages } from "../api";
import Grid from "../components/Grid";
import FullImageCard from "../components/ImageCard/FullImageCard";
import { ImageCard } from "../components/ImageCard/ImageCard";
import useHomeImages from "../hooks/useHomeImages";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

export interface HomeProps {
  requiredId?: string;
}

const Home: NextPageWithLayout<HomeProps> = ({ requiredId }) => {
  const [activeCatId, setActiveCatId] = useState<string | null>(
    requiredId ?? null
  );

  const { hasNextPage, isError, isLoading, fetchNextPage, images } =
    useHomeImages(requiredId);

  const getOnClick = (catData: NormalizedCatData) => () => {
    setActiveCatId(catData.id);
  };

  const activeCatData = useMemo(() => {
    return images?.find((catData) => catData.id === activeCatId);
  }, [activeCatId, images]);

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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
      <Grid>
        {images?.map((catData, index) => (
          <ImageCard
            onClick={getOnClick(catData)}
            invisible={activeCatData?.id === catData.id}
            key={`${index}-${catData.id}`}
            catData={catData}
            expanded={false}
          />
        ))}
        {activeCatData && (
          <FullImageCard
            onClose={() => {
              window.history.pushState({}, "", "/");
              return setActiveCatId(null);
            }}
            catData={activeCatData}
          />
        )}
      </Grid>
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
