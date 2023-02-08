import { Collapse } from "../../Collapse";
import type { ImageCardProps } from "../ImageCard";

export const ImageCardBreedDescription = ({
  catData,
  expanded,
}: ImageCardProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <Collapse direction="vertical" expandedClassName="pt-4" expanded={expanded}>
      <p className="p-4 pt-0">{breed.description}</p>
    </Collapse>
  );
};
