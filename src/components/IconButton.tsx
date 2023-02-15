import classNames from "classnames";
import type { MouseEventHandler, ReactNode } from "react";

export interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  shape?: "circle" | "square";
}

export const IconButton = ({
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
