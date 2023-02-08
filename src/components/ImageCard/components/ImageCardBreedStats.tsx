import type { CollapseDirection } from "../../Collapse";
import { Collapse } from "../../Collapse";
import type { ImageCardProps } from "../ImageCard";

const ATTRIBUTES: [string, string][] = [
  ["adaptability", "Adaptability"],
  ["affectionLevel", "Affection Level"],
  ["bidability", "Bidability"],
  ["energyLevel", "Energy Level"],
  ["grooming", "Grooming"],
  ["healthIssues", "Health Issues"],
  ["intelligence", "Intelligence"],
  ["lap", "Lap"],
  ["sheddingLevel", "Shedding Level"],
  ["socialNeeds", "Social Needs"],
  ["vocalisation", "Vocalisation"],
  ["catFriendly", "Cat Friendly"],
  ["childFriendly", "Child Friendly"],
  ["dogFriendly", "Dog Friendly"],
  ["strangerFriendly", "Stranger Friendly"],
];

export interface ImageCardBreedStatsProps extends ImageCardProps {
  collapseDirection: CollapseDirection;
  className?: string;
}

export const ImageCardBreedStats = ({
  catData,
  className,
  expanded,
  collapseDirection,
}: ImageCardBreedStatsProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <Collapse
      className={className}
      direction={collapseDirection}
      expanded={expanded}
    >
      <div className="max-h-full w-96 overflow-auto p-4">
        <ul>
          {ATTRIBUTES.map(([key, label]) => {
            const value = breed.stats[key as keyof typeof breed.stats];

            if (value === undefined) return null;

            return (
              <li key={key}>
                <div>{label}:</div>
                <progress
                  className="progress progress-primary"
                  max="5"
                  value={value}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Collapse>
  );
};
