import classNames from "classnames";
import type { MouseEvent, ReactNode } from "react";

export interface IconButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  shape?: "circle" | "square";
}

const IconButton = ({
  onClick,
  children,
  isLoading,
  disabled,
  className,
  shape = "circle",
}: IconButtonProps) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={classNames(
      "btn-ghost  btn",
      className,
      shape === "circle" ? "btn-circle" : "btn-square",
      isLoading && "loading"
    )}
  >
    {isLoading ? null : children}
  </button>
);

export default IconButton;
