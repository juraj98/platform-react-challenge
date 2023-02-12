import { useQuery } from "@tanstack/react-query";
import type { CatBreed } from "../../api";
import { getImages } from "../../api";
import Card from "./Card";
import { getImageDataOrPlaceholder } from "../../utils/image";

export interface BreedCardProps {
  breed: CatBreed;
  setActiveBreedId: (catId: string) => void;
}

const BreedCard = ({ breed, setActiveBreedId }: BreedCardProps) => {
  const { isError, data } = useQuery({
    queryKey: ["images", "breed", breed.id, 1],
    queryFn: () =>
      getImages({
        breedIds: [breed.id],
        limit: 1,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return <div>Error</div>;
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

          setActiveBreedId(breed.id);
        },
      }}
    />
  );
};

export default BreedCard;
