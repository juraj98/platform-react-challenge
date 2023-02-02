import type { ReactNode } from "react";
import cx from "classnames";

export interface AnimateProps {
  children: ReactNode;
  collapsed: boolean;
  horizontal?: boolean;
  vertical?: boolean;
}

export default function Animate({
  children,
  collapsed,
  horizontal = false,
  vertical = false,
}: AnimateProps) {
  cx(
    "grid-row grid overflow-hidden transition-all",
    collapsed ? "grid-rows-[0fr] px-4" : "grid-rows-[1fr] px-0"
  );

  if (!horizontal && !vertical) return <>children</>;

  const verticalClass = collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]";
  const horizontalClass = collapsed ? "grid-col-[0fr]" : "grid-col-[1fr]";

  return (
    <div
      className={cx(
        "grid overflow-hidden transition-all",
        vertical && verticalClass,
        horizontal && horizontalClass
      )}
    >
      <div className="min-h-0">{children}</div>
    </div>
  );
}
