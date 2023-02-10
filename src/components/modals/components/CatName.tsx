import type { NormalizedCatData } from "../../../api";

export interface CatNameProps {
  catData: NormalizedCatData;
}

const CatName = ({ catData }: CatNameProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return <h2 className="p-4 text-lg font-bold">{breed.name}</h2>;
};

export default CatName;
