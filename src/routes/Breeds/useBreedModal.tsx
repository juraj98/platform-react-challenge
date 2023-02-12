import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import type { CatBreed, NormalizedCatData } from "../../api";
import { getImages } from "../../api";
import { normalizeBreed } from "../../api";
import { getImageDataOrPlaceholder } from "../../utils/image";
import { CatModal } from "../../components/CatModal/CatModal";

export type SetBreedModalData = (
  breed: CatBreed,
  breedImageData: NormalizedCatData
) => void;

export const useBreedModal = () => {
  const queryClient = useQueryClient();
  const [isOpened, setIsOpened] = useState(false);
  const [breedData, setBreedData] = useState<CatBreed>();
  const [breedImageData, setBreedImageData] = useState<NormalizedCatData>();
  const [additionalBreedImages, setAdditionalBreedImages] =
    useState<NormalizedCatData[]>();

  const setBreedModalData = useCallback(
    (breed: CatBreed, breedImageData: NormalizedCatData) => {
      setBreedData(breed);
      setBreedImageData(breedImageData);
      setIsOpened(true);
    },
    []
  );

  useEffect(() => {
    if (isOpened && breedData) {
      setAdditionalBreedImages(undefined);
      queryClient
        .fetchQuery({
          queryKey: ["images", "breed", breedData.id],
          queryFn: () => getImages({ breedIds: [breedData.id], limit: 10 }),
        })
        .then((data) => {
          setAdditionalBreedImages(data);
        })
        .catch(console.error);
    }
  }, [breedData, isOpened, queryClient]);

  const node = isOpened ? (
    <CatModal
      onClose={() => setIsOpened(false)}
      mainImage={getImageDataOrPlaceholder({
        src: breedImageData?.url,
        alt: breedImageData?.breeds?.[0]?.name || "Cat",
        width: breedImageData?.width,
        height: breedImageData?.height,
      })}
      breed={breedData ? normalizeBreed(breedData) : undefined}
      additionalImages={additionalBreedImages}
    />
  ) : null;

  return {
    node,
    setBreedModalData,
  };
};
