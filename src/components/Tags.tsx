import type { ReactNode } from "react";
import cx from "classnames";

export interface TagsProps {
  tags?: ReactNode[];
  className?: string;
}

export default function Tags({ tags, className }: TagsProps) {
  if (!tags) return null;

  return (
    <ul className={cx("flex flex-wrap items-center gap-2", className)}>
      {tags.map((tag, index) => (
        <li key={index} className="badge badge-primary whitespace-pre">
          {tag}
        </li>
      ))}
    </ul>
  );
}
