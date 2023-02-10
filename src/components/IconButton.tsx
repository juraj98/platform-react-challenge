import classNames from "classnames";
import type { MouseEvent, ReactNode } from "react";

export interface IconButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  isLoading?: boolean;
}

const IconButton = ({ onClick, children, isLoading }: IconButtonProps) => (
  <button
    onClick={onClick}
    className={classNames("btn-ghost btn-circle btn", isLoading && "loading")}
  >
    {isLoading ? null : children}
  </button>
);

export default IconButton;
