import Image from "next/image";
import Link from "next/link";
import type { NormalizedCatData } from "../../../api";

export interface AdditionalImagesProps {
  images?: NormalizedCatData[];
}

export const AdditionalImages = ({ images }: AdditionalImagesProps) => {
  if (!images) return null;

  return (
    <div className="carousel rounded-box mx-4 mb-4 h-32">
      {images.map((catImage) => {
        return (
          <div key={catImage.id} className="carousel-item">
            <Link href={`image/${catImage.id}`}>
              <Image
                src={catImage.url}
                alt={catImage.breeds?.[0]?.name || "Cat"}
                width={catImage.width}
                className="h-full w-auto"
                height={catImage.height}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
