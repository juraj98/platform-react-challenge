import Image from "next/image";
import type { ImageCardProps } from "../ImageCard";
import cx from "classnames";

export const ImageCardImage = ({ catData, expanded }: ImageCardProps) => {
  return (
    <figure className="overflow-auto">
      <div className="flex items-center justify-center overflow-hidden rounded-t-lg">
        <Image
          src={catData.url}
          height={catData.height}
          width={catData.width}
          alt="Cat"
          className={cx("rounded-t-lg transition-all", expanded && "p-4")}
        />
      </div>
    </figure>
  );
};
