import { useQuery } from "@tanstack/react-query";
import type { CatBreed } from "../../../api";
import { getImages } from "../../../api";
import { Card } from "../../../components/Card";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { getImageDataOrPlaceholder } from "../../../utils/image";
import type { SetBreedModalData } from "../useBreedModal";

export interface BreedCardProps {
  breed: CatBreed;
  setBreedModalData: SetBreedModalData;
}

export const BreedCard = ({ breed, setBreedModalData }: BreedCardProps) => {
  const { isError, data } = useQuery({
    queryKey: ["images", "breed", breed.id, 1],
    queryFn: () =>
      getImages({
        breedIds: [breed.id],
        limit: 1,
        order: "ASC",
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Card
      key={breed.id}
      label={breed.name}
      image={getImageDataOrPlaceholder({
        src: data?.[0]?.url,
        width: data?.[0]?.width,
        height: data?.[0]?.height,
        alt: breed.name,
      })}
      link={{
        href: `/breeds/${breed.id}`,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (data?.[0]) {
            setBreedModalData(breed, data[0]);
          }
        },
      }}
    />
  );
};
