import type { ImageCardProps } from "../ImageCard";
import classNames from "classnames";

export const ImageCardWrapper = ({
  children,
  invisible,
  expanded,
}: ImageCardProps) => {
  return (
    <div
      className={classNames(
        "h-fit w-fit overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-[1s]",
        expanded ? "max-w-full p-4" : "max-w-[16rem]",
        invisible && "invisible transition-none"
      )}
    >
      {children}
    </div>
  );
};
