import { useSubId } from "hooks/useSubId";
import { useCallback, useEffect, useMemo } from "react";
import type { NormalizedImageData } from "server/api/routers/images";
import { api } from "utils/api";

const NUMBER_OF_IMAGES_PER_PAGE = 25;
const SCROLL_THRESHOLD_PX = 500;

export const useHomeInfiniteScroll = (imageFromUrl?: NormalizedImageData) => {
  const subId = useSubId();

  const { data, isError, fetchNextPage, isFetchingNextPage, isLoading } =
    api.images.getImages.useInfiniteQuery(
      {
        limit: imageFromUrl
          ? NUMBER_OF_IMAGES_PER_PAGE - 1
          : NUMBER_OF_IMAGES_PER_PAGE,
        subId,
      },
      {
        getNextPageParam: (lastPage, allPages) => allPages.length + 1,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        refetchOnMount: false,
        enabled: Boolean(subId),
      }
    );

  const images = useMemo(
    () =>
      imageFromUrl
        ? [imageFromUrl, ...(data?.pages.flat() || [])]
        : data?.pages.flat(),
    [imageFromUrl, data?.pages]
  );

  const onScrollListener = useCallback(() => {
    if (isFetchingNextPage) return;

    if (
      window.scrollY >
      document.body.scrollHeight - window.innerHeight - SCROLL_THRESHOLD_PX
    ) {
      void fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!document) return;

    document.addEventListener("scroll", onScrollListener as EventListener);

    return () => {
      document.removeEventListener("scroll", onScrollListener as EventListener);
    };
  }, [onScrollListener]);

  return {
    isError,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    images,
  };
};
