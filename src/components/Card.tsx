import classNames from "classnames";
import Image from "next/image";
import type { MouseEventHandler, ReactNode } from "react";
import type { ImageProps } from "../utils/image";

export interface CardProps {
  label: string;
  image: ImageProps;
  button?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Card = ({
  label,
  className,
  image,
  onClick,
  button,
}: CardProps) => {
  return (
    <div
      className={classNames("card h-fit w-96 bg-base-100 shadow-xl", className)}
      onClick={onClick}
    >
      <figure>
        <Image
          priority
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      </figure>
      <div className="card-body flex-row justify-between">
        <h2 className="card-title">{label}</h2>
        {button}
      </div>
    </div>
  );
};
