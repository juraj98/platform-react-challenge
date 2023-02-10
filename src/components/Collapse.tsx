import type { ReactNode } from "react";
import classNames from "classnames";

export type CollapseDirection = "horizontal" | "vertical" | "both";

export interface CollapseProps {
  children: ReactNode;
  expanded?: boolean;
  direction: CollapseDirection;
  className?: string;
  expandedClassName?: string;
  collapsedClassName?: string;
}

export const Collapse = ({
  children,
  className,
  collapsedClassName,
  expandedClassName,
  direction,
  expanded = false,
}: CollapseProps) => {
  const vertical = expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]";
  const horizontal = expanded ? "grid-cols-[1fr]" : "grid-cols-[0fr]";

  return (
    <div
      className={classNames(
        "grid overflow-hidden transition-all duration-[1s]",
        className,
        expanded ? expandedClassName : collapsedClassName,
        (direction === "both" || direction === "vertical") && vertical,
        (direction === "both" || direction === "horizontal") && horizontal
      )}
    >
      <div className="flex min-h-0 min-w-0">{children}</div>
    </div>
  );
};
