import { useInfiniteQuery } from "@tanstack/react-query";
import { getImages } from "../api";
import { ImageCard } from "../components/ImageCard/ImageCard";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
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
      {result.data?.pages.map((page, pageIndex) =>
        page.map((catData, index) => (
          <ImageCard
            key={`${pageIndex}-${catData.id}`}
            catData={catData}
            expanded={false}
          />
        ))
      )}
    </div>
  );
};

Home.getLayout = MainLayout;

export default Home;
