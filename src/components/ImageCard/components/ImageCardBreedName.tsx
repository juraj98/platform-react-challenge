import type { ImageCardProps } from "../ImageCard";

export const ImageCardBreedName = ({ catData }: ImageCardProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return <h2 className="p-4 text-lg font-bold">{breed.name}</h2>;
};
