import cx from "classnames";
import { Collapse } from "../../Collapse";
import type { ImageCardProps } from "../ImageCard";

export default function ImageCardTags({ expanded, catData }: ImageCardProps) {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <Collapse direction="vertical" expandedClassName="py-4" expanded={expanded}>
      <ul className={cx("flex flex-wrap items-center gap-2 px-4")}>
        {breed.tags.map((tag, index) => (
          <li key={index} className="badge-primary badge whitespace-pre">
            {tag}
          </li>
        ))}
      </ul>
    </Collapse>
  );
}
