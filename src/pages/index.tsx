import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { NormalizedCatData } from "../api";
import { getImages } from "../api";
import FullImageCard from "../components/ImageCard/FullImageCard";
import { ImageCard } from "../components/ImageCard/ImageCard";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const [activeImageData, setActiveImageData] = useState<null | {
    catData: NormalizedCatData;
    element: HTMLDivElement;
  }>(null);

  const { hasNextPage, isFetchingNextPage, fetchNextPage, ...result } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 1 }) =>
        getImages({ page: pageParam as number, limit: 25, hasBreeds: true }),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages): number => allPages.length + 1,
      refetchOnWindowFocus: false,
    });

  const getOnClick =
    (catData: NormalizedCatData) => (element: HTMLDivElement) => {
      setActiveImageData({ catData, element });
    };

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
            invisible={activeImageData?.catData.id === catData.id}
            key={`${pageIndex}-${index}-${catData.id}`}
            catData={catData}
            expanded={false}
          />
        ))
      )}
      {activeImageData && (
        <FullImageCard
          onClose={() => setActiveImageData(null)}
          catData={activeImageData.catData}
          startFrom={activeImageData.element.getBoundingClientRect()}
        />
      )}
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
