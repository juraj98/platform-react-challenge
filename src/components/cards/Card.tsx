import Image from "next/image";
import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

export interface CardProps {
  label: string;
  image?: {
    alt: string;
    url: string;
    width: number;
    height: number;
    placeholder?: string;
  };
  link: {
    onClick?: (event: MouseEvent) => void;
    href: string;
  };
  button?: ReactNode;
}

const Card = ({ label, image, link, button }: CardProps) => (
  <Link href={link.href} onClick={link.onClick} className="h-fit">
    <div className="card w-96 bg-base-100 shadow-xl">
      {image ? (
        <figure>
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
        </figure>
      ) : (
        <div className="h-52 w-96 animate-pulse bg-gray-200" />
      )}
      <div className="card-body flex-row justify-between">
        <h2 className="card-title">{label}</h2>
        {button}
      </div>
    </div>
  </Link>
);

export default Card;
