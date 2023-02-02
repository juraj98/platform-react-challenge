import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { NormalizedCatData } from "../api";
import { getImages } from "../api";
import FullImageCard from "../components/FullImageCard";
import ImageCard from "../components/ImageCard";
import NewFullImageCard from "../components/animation/NewFullImageCard";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import ImageCardBackground from "../components/ImageCard/ImageCardBackground";

const Home: NextPageWithLayout = () => {
  const [openedCardData, setOpenedCardData] = useState<{
    catData: NormalizedCatData;
    domRect: DOMRect;
  } | null>(null);

  const { hasNextPage, isFetchingNextPage, fetchNextPage, ...result } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 1 }) =>
        getImages({ page: pageParam as number, limit: 25, hasBreeds: true }),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages): number => allPages.length + 1,
      refetchOnWindowFocus: false,
    });

  if (isFetchingNextPage) {
    return <div>Loading...</div>;
  }

  if (result.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-row flex-wrap justify-center gap-5">
      {/* {openedCardData && (
        <FullImageCard
          catData={openedCardData.catData}
          startFrom={openedCardData.domRect}
          onClose={() => setOpenedCardData(null)}
        />
      )} */}
      {openedCardData && (
        <NewFullImageCard
          startFrom={{
            top: openedCardData.domRect.top,
            left: openedCardData.domRect.left,
            width: openedCardData.domRect.width,
            height: openedCardData.domRect.height,
          }}
          onClose={() => setOpenedCardData(null)}
        />
      )}
      {result.data?.pages.map((page, pageIndex) => {
        return page.map((catData) => {
          return (
            <ImageCardBackground key={`${pageIndex}-${catData.id}`}>
              <ImageCard
                catData={catData}
                setOpenedCardData={(data) => {
                  if (openedCardData) return;
                  setOpenedCardData(data);
                }}
              />
            </ImageCardBackground>
          );
        });
      })}
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
