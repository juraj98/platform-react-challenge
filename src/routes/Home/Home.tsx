import { useSubId } from "hooks/useSubId";
import type { NormalizedImageData } from "server/api/routers/images";
import { api } from "utils/api";

const NUMBER_OF_IMAGES_PER_PAGE = 25;

export interface HomeProps {
  imageFromUrl?: NormalizedImageData;
}

export const Home = ({ imageFromUrl }: HomeProps) => {
  const subId = useSubId();
  const { data, isError, isFetchingNextPage, isLoading } =
    api.images.getImages.useInfiniteQuery(
      {
        limit: imageFromUrl
          ? NUMBER_OF_IMAGES_PER_PAGE - 1
          : NUMBER_OF_IMAGES_PER_PAGE,
        subId,
      },
      {
        getNextPageParam: (lastPage, allPages) => allPages.length + 1,
      }
    );

  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
    </div>
  );
};
