import { useCallback, useState } from "react";
import type { CatBreed, NormalizedCatData } from "../../api";
import { normalizeBreed } from "../../api";
import { getImageDataOrPlaceholder } from "../../utils/image";
import Modal from "./Modal";

export type SetBreedModalData = (
  breed: CatBreed,
  breedImageData: NormalizedCatData
) => void;

export const useBreedModal = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [breedData, setBreedData] = useState<CatBreed>();
  const [breedImageData, setBreedImageData] = useState<NormalizedCatData>();

  const setBreedModalData = useCallback(
    (breed: CatBreed, breedImageData: NormalizedCatData) => {
      setBreedData(breed);
      setBreedImageData(breedImageData);
      setIsOpened(true);
    },
    []
  );

  const node = isOpened ? (
    <Modal
      onClose={() => setIsOpened(false)}
      mainImage={getImageDataOrPlaceholder({
        src: breedImageData?.url,
        alt: breedImageData?.breeds?.[0]?.name || "Cat",
        width: breedImageData?.width,
        height: breedImageData?.height,
      })}
      breed={breedData ? normalizeBreed(breedData) : undefined}
    />
  ) : null;

  return {
    node,
    setBreedModalData,
  };
};
