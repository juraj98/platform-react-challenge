import { useQuery } from "@tanstack/react-query";
import type { CatBreed } from "../../api";
import { getImages } from "../../api";
import Card from "./Card";
import catPlaceholderLg from "../../assets/images/cat-placeholder-lg.svg";
import type { ImportedImage } from "../../types";

export interface BreedCardProps {
  breed: CatBreed;
}

const BreedCard = ({ breed }: BreedCardProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["images", "breed", breed.id, 1],
    queryFn: () =>
      getImages({
        breedIds: [breed.id],
        limit: 1,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Card
      key={breed.id}
      label={breed.name}
      image={{
        url: data[0]?.url ?? (catPlaceholderLg as ImportedImage).src,
        width: data[0]?.width ?? (catPlaceholderLg as ImportedImage).width,
        height: data[0]?.height ?? (catPlaceholderLg as ImportedImage).height,
        alt: breed.name,
        placeholder: (catPlaceholderLg as ImportedImage).src,
      }}
      link={{
        href: `/breeds/${breed.id}`,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();
        },
      }}
    />
  );
};

export default BreedCard;
