import catPlaceholderLg from "../assets/images/cat-placeholder-lg.svg";
import type { ImportedImage } from "../types";

export interface ImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

const placeholderImageData = {
  src: (catPlaceholderLg as ImportedImage).src,
  width: (catPlaceholderLg as ImportedImage).width,
  height: (catPlaceholderLg as ImportedImage).height,
  alt: "Cat placeholder",
};

export const getImageDataOrPlaceholder = (
  imageData?: Partial<{
    alt: string;
    src: string;
    width: number;
    height: number;
  }>
) => {
  if (
    imageData &&
    imageData.src &&
    imageData.width &&
    imageData.height &&
    imageData.alt
  )
    return imageData as ImageProps;

  return placeholderImageData;
};
