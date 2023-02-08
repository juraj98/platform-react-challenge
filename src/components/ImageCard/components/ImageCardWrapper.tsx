import type { ImageCardProps } from "../ImageCard";
import cx from "classnames";

export const ImageCardWrapper = ({
  children,
  invisible,
  expanded,
}: ImageCardProps) => {
  return (
    <div
      className={cx(
        "h-fit w-fit overflow-hidden rounded-lg bg-white shadow-lg transition-all",
        expanded ? "max-w-full p-4" : "max-w-[16rem]",
        invisible && "invisible"
      )}
    >
      {children}
    </div>
  );
};
