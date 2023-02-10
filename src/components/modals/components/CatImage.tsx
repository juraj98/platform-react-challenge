import Image from "next/image";
import type { NormalizedCatData } from "../../../api";

export interface CatImageProps {
  catData: NormalizedCatData;
}

const CatImage = ({ catData }: CatImageProps) => {
  return (
    <figure className="flex justify-center p-4">
      <Image
        className="max-w-lg"
        src={catData.url}
        alt={catData.breeds[0]?.name || "Cat"}
        width={catData.width}
        height={catData.height}
      />
    </figure>
  );
};

export default CatImage;
