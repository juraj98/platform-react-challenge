import { useSubId } from "hooks/useSubId";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import type { NormalizedImageData } from "server/api/routers/images";
import { api } from "utils/api";

const NUMBER_OF_IMAGES_PER_PAGE = 25;
const SCROLL_THRESHOLD_PX = 500;

export const useHomeInfiniteScroll = (
  setModalData: (imageData: NormalizedImageData | null) => void,
  imageFromUrl?: NormalizedImageData
) => {
  const subId = useSubId();
  const router = useRouter();

  const {
    data,
    isError,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.images.getImages.useInfiniteQuery(
    {
      limit: imageFromUrl
        ? NUMBER_OF_IMAGES_PER_PAGE - 1
        : NUMBER_OF_IMAGES_PER_PAGE,
      subId,
    },
    {
      getNextPageParam: (lastPage, allPages) => allPages.length + 1,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
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
    if (isFetching || isLoading) return;

    if (
      window.scrollY >
      document.body.scrollHeight - window.innerHeight - SCROLL_THRESHOLD_PX
    ) {
      void fetchNextPage();
    }
  }, [isFetching, isLoading, fetchNextPage]);

  useEffect(() => {
    if (!document) return;

    document.addEventListener("scroll", onScrollListener as EventListener);

    return () => {
      document.removeEventListener("scroll", onScrollListener as EventListener);
    };
  }, [onScrollListener]);

  useEffect(() => {
    if (!window) return undefined;

    const callback = (event: PopStateEvent) => {
      const state = event.state as { href?: string };

      const imageId = state.href?.split("/")?.pop();

      const imageData = images?.find((image) => image.id === imageId);

      setModalData(imageData ?? null);
    };

    window.addEventListener("popstate", callback);

    return () => {
      window.removeEventListener("popstate", callback);
    };
  }, [images, router, setModalData]);

  return {
    isError,
    isFetchingNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
    images,
  };
};
