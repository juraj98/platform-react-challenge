import classNames from "classnames";
import type { NormalizedCatData } from "../../../api";

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

export interface CatStatsProps {
  fullWidth?: boolean;
  catData: NormalizedCatData;
}

const CatStats = ({ catData, fullWidth = false }: CatStatsProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <div
      className={classNames(
        "max-h-full overflow-auto p-4",
        fullWidth ? "w-full" : "w-96"
      )}
    >
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
  );
};

export default CatStats;
