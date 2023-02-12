import Image from "next/image";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import type { ImageProps } from "../utils/image";

export interface CardLink {
  onClick?: (event: MouseEvent) => void;
  href: string;
}

export interface CardProps {
  label: string;
  image: ImageProps;
  button?: ReactNode;
}

export const Card = ({ label, image, button }: CardProps) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
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
