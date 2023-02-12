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
  image?: ImageProps;
  link?: CardLink;
  button?: ReactNode;
}

const LinkComponent = ({
  link,
  children,
}: {
  link?: CardLink;
  children: ReactNode;
}) =>
  link ? (
    <Link href={link.href} onClick={link.onClick} className="h-fit">
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

const Card = ({ label, image, link, button }: CardProps) => {
  return (
    <LinkComponent link={link}>
      <div className="card w-96 bg-base-100 shadow-xl">
        {image ? (
          <figure>
            <Image
              priority
              src={image.src}
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
    </LinkComponent>
  );
};

export default Card;
