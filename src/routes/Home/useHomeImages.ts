import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { NormalizedCatData } from "../../api";
import { getImages } from "../../api";

const NUMBER_OF_IMAGES = 25;

export default function useHomeImages(requiredCat?: NormalizedCatData) {
  const {
    hasNextPage,
    isError: isImagesError,
    fetchNextPage,
    isFetchingNextPage,
    ...result
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: ({ pageParam = 1 }) =>
      getImages({
        page: pageParam as number,
        limit: requiredCat ? NUMBER_OF_IMAGES - 1 : NUMBER_OF_IMAGES,
        hasBreeds: true,
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages): number => allPages.length + 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const images = useMemo(
    () =>
      requiredCat
        ? [requiredCat, ...(result.data?.pages.flat() || [])]
        : result.data?.pages.flat(),
    [requiredCat, result.data?.pages]
  );

  return {
    hasNextPage,
    isError: isImagesError,
    isLoading: result.isLoading,
    fetchNextPage,
    isFetchingNextPage,
    images,
  };
}
