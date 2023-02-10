import Image from "next/image";
import type { ImageCardProps } from "../ImageCard";
import classNames from "classnames";

export const ImageCardImage = ({
  catData,
  invisible,
  expanded,
}: ImageCardProps) => {
  return (
    <figure className="overflow-auto">
      <div className="flex items-center justify-center overflow-hidden rounded-t-lg">
        <Image
          src={catData.url}
          height={catData.height}
          width={catData.width}
          alt="Cat"
          className={classNames(
            "rounded-t-lg transition-all duration-[1s]",
            expanded && "p-4",
            invisible && "transition-none"
          )}
        />
      </div>
    </figure>
  );
};
