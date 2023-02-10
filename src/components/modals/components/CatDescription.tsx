import type { NormalizedCatData } from "../../../api";

export interface CatDescriptionProps {
  catData: NormalizedCatData;
}

export const CatDescription = ({ catData }: CatDescriptionProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return <p className="p-4 pt-0">{breed.description}</p>;
};
