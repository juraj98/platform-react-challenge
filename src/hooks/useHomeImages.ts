import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getImageById, getImages } from "../api";

const NUMBER_OF_IMAGES = 25;

export default function useHomeImages(requiredId?: string) {
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
        limit: requiredId ? NUMBER_OF_IMAGES - 1 : NUMBER_OF_IMAGES,
        hasBreeds: true,
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages): number => allPages.length + 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const {
    isLoading,
    isError: isRequiredImageError,
    data,
  } = useQuery({
    enabled: Boolean(requiredId),
    queryKey: ["image", requiredId],
    queryFn: () =>
      requiredId ? getImageById(requiredId) : Promise.resolve(null),
  });

  const images = useMemo(
    () =>
      data
        ? [data, ...(result.data?.pages.flat() || [])]
        : result.data?.pages.flat(),
    [data, result.data?.pages]
  );

  return {
    hasNextPage,
    isError: isImagesError || isRequiredImageError,
    isLoading: (Boolean(requiredId) ? isLoading : false) || result.isLoading,
    fetchNextPage,
    isFetchingNextPage,
    images,
  };
}
