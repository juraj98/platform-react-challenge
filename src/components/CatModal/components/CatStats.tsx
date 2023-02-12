import classNames from "classnames";
import type { NormalizedBreedData } from "server/api/routers/breeds";

const ATTRIBUTES: [keyof NormalizedBreedData["stats"], string][] = [
  ["adaptability", "Adaptability"],
  ["affectionLevel", "Affection Level"],
  ["bidability", "Bidability"],
  ["energyLevel", "Energy Level"],
  ["grooming", "Grooming"],
  ["intelligence", "Intelligence"],
  ["sheddingLevel", "Shedding Level"],
  ["socialNeeds", "Social Needs"],
  ["vocalisation", "Vocalisation"],
];

export interface CatStatsProps {
  fullWidth?: boolean;
  stats: NormalizedBreedData["stats"];
}

export const CatStats = ({ stats, fullWidth = false }: CatStatsProps) => {
  return (
    <div
      className={classNames(
        "max-h-full overflow-auto p-4",
        fullWidth ? "w-full" : "w-96"
      )}
    >
      <ul>
        {ATTRIBUTES.map(([key, label]) => {
          const value = stats[key];

          if (value === null) return null;

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
