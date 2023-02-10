import type { ReactNode } from "react";
import classNames from "classnames";

export interface GridProps {
  children: ReactNode;
  className?: string;
}

const Grid = ({ children, className }: GridProps) => {
  return (
    <div
      className={classNames(
        "flex flex-row flex-wrap justify-center gap-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Grid;
