import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { CatBreed, NormalizedCatData } from "../../api";
import { getImages } from "../../api";
import useStyle from "../../hooks/useStyle";
import { getImageDataOrPlaceholder } from "../../utils/image";
import Modal from "./Modal";

export const useBreedModal = (
  breeds: CatBreed[] | undefined,
  breedImages?: Record<CatBreed["id"], NormalizedCatData[]>,
  requiredId?: string
) => {
  const queryClient = useQueryClient();

  const [activeBreedImages, setActiveBreedImages] =
    useState<NormalizedCatData[]>(null);

  const [activeBreedId, setActiveBreedId] = useState<string | null>(
    requiredId || null
  );

  useStyle(activeBreedId ? "body { overflow: hidden; }" : "");

  const activeBreedData = useMemo(() => {
    return breeds?.find((breed) => breed.id === activeBreedId);
  }, [activeBreedId, breeds]);

  useEffect(() => {
    if (!activeBreedData) return;

    queryClient
      .fetchQuery({
        queryKey: ["images", "breed", activeBreedData.id, 10],
        queryFn: () =>
          getImages({
            breedIds: [activeBreedData.id],
            limit: 1,
          }),
      })
      .then((data) => {
        setActiveBreedImages(data);
      })
      .catch(console.error);
  }, [activeBreedData, queryClient]);

  const node =
    activeBreedData && activeBreedImages ? (
      <Modal
        onClose={() => setActiveBreedId(null)}
        mainImage={getImageDataOrPlaceholder({
          src: activeBreedImages[0]?.url,
          alt: activeBreedImages[0]?.breeds?.[0]?.name || "Cat",
          width: activeBreedImages[0]?.width,
          height: activeBreedImages[0]?.height,
        })}
        breed={activeBreedImages[0]?.breeds[0]}
      />
    ) : null;

  return {
    node,
    setActiveBreedId,
  };
};
