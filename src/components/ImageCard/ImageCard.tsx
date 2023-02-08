import type { MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { NormalizedCatData } from "../../api";
import { ImageCardBreedDescription } from "./components/ImageCardBreedDescription";
import { ImageCardBreedName } from "./components/ImageCardBreedName";
import { ImageCardBreedStats } from "./components/ImageCardBreedStats";
import { ImageCardFavoriteButton } from "./components/ImageCardFavoriteButton";
import { ImageCardImage } from "./components/ImageCardImage";
import ImageCardTags from "./components/ImageCardTags";
import { ImageCardWrapper } from "./components/ImageCardWrapper";

export interface ImageCardProps {
  expanded?: boolean;
  catData: NormalizedCatData;
  children?: ReactNode;
  invisible?: boolean;
  onClick?: (element: HTMLDivElement) => void;
}

export const ImageCard = ({ onClick, ...otherProps }: ImageCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onClick={() => {
        if (ref.current && onClick) onClick(ref.current);
      }}
      className="overflow-auto"
    >
      <ImageCardWrapper {...otherProps}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <ImageCardImage {...otherProps} />
            <ImageCardTags {...otherProps} />
            <div className="flex flex-row items-center ">
              <ImageCardFavoriteButton {...otherProps} />
              <ImageCardBreedName {...otherProps} />
            </div>
            <ImageCardBreedDescription {...otherProps} />
            <ImageCardBreedStats
              {...otherProps}
              className="md:hidden"
              collapseDirection="vertical"
            />
          </div>
          <div className="flex flex-shrink-0 flex-col">
            <div>
              <ImageCardBreedStats
                {...otherProps}
                collapseDirection="both"
                className="hidden md:grid"
              />
            </div>
          </div>
        </div>
      </ImageCardWrapper>
    </div>
  );
};
