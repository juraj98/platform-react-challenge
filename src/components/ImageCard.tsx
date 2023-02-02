import Image from "next/image";
import { useRef } from "react";
import type { NormalizedCatData } from "../api";

export interface ImageCardProps {
  catData: NormalizedCatData;
  setOpenedCardData: (data: {
    catData: NormalizedCatData;
    domRect: DOMRect;
  }) => void;
}

export default function ImageCard({
  catData,
  setOpenedCardData,
}: ImageCardProps) {
  const breed = catData.breeds && catData.breeds[0];
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    // if (window) window.history.pushState(null, "", `/image/${catData.id}`);

    if (!ref.current) return;

    setOpenedCardData({
      catData,
      domRect: ref.current.getBoundingClientRect(),
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="card-compact card h-fit w-96 bg-base-100 shadow-lg"
    >
      <figure>
        <Image
          alt="Cat"
          src={catData.url}
          height={catData.height}
          width={catData.width}
        />
      </figure>
      {breed && (
        <div className="card-body">
          <h2 className="card-title">{breed.name}</h2>
        </div>
      )}
    </div>
  );
}
