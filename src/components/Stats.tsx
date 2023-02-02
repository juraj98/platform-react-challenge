import type { ReactNode } from "react";
import type { NormalizedCatBreed } from "../api";
import cx from "classnames";

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

export interface Stat {
  key: string;
  label: ReactNode;
  value: number;
}

export interface StatsProps {
  stats?: NormalizedCatBreed["stats"];
  max?: number;
  className?: string;
}

export default function Stats({ className, stats, max = 5 }: StatsProps) {
  if (!stats) return null;

  return (
    <div className={cx("max-h-full overflow-auto", className)}>
      <ul>
        {ATTRIBUTES.map(([key, label]) => {
          const value = stats[key as keyof typeof stats];

          if (value === undefined) return null;

          return (
            <li key={key}>
              <div>{label}:</div>
              <progress
                className="progress progress-primary"
                max={max}
                value={value}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
