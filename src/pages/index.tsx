import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { NormalizedCatData } from "../api";
import { getImages } from "../api";
import FullImageCard from "../components/ImageCard/FullImageCard";
import { ImageCard } from "../components/ImageCard/ImageCard";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);

  const { hasNextPage, isFetchingNextPage, fetchNextPage, ...result } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 1 }) =>
        getImages({ page: pageParam as number, limit: 25, hasBreeds: true }),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages): number => allPages.length + 1,
      refetchOnWindowFocus: false,
    });

  const getOnClick = (catData: NormalizedCatData) => () => {
    setActiveCatId(catData.id);
  };

  const activeCatData = useMemo(() => {
    let value: NormalizedCatData | undefined;

    result.data?.pages.some((page) => {
      value = page.find((catData) => catData.id === activeCatId);

      return value;
    });

    return value;
  }, [activeCatId, result.data]);

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

  if (isFetchingNextPage) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5">
      {result.data?.pages.map((page, pageIndex) =>
        page.map((catData, index) => (
          <ImageCard
            onClick={getOnClick(catData)}
            invisible={activeCatData?.id === catData.id}
            key={`${pageIndex}-${index}-${catData.id}`}
            catData={catData}
            expanded={false}
          />
        ))
      )}
      {activeCatData && (
        <FullImageCard
          onClose={() => {
            window.history.pushState({}, "", "/");
            return setActiveCatId(null);
          }}
          catData={activeCatData}
        />
      )}
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
