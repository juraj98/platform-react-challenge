import classNames from "classnames";
import { AdditionalImages } from "components/CatModal/components/AdditionalImages";
import { CatStats } from "components/CatModal/components/CatStats";
import { CatTags } from "components/CatModal/components/CatTags";
import { IconButton } from "components/IconButton";
import { IconClose } from "components/icons/IconClose";
import { IconHeart } from "components/icons/IconHeart";
import { useStyle } from "hooks/useStyle";
import Image from "next/image";
import type { MouseEventHandler } from "react";
import type { NormalizedImageData } from "server/api/routers/images";
import { containTargetListener, sameTargetListener } from "utils/uiListeners";

export interface CatModalProps {
  onClose: MouseEventHandler;
  imageData: NormalizedImageData;
  favorite?: {
    onClick: MouseEventHandler<HTMLElement>;
    isFetching: boolean;
    isLoading: boolean;
    isFavorite: boolean;
  };
  showAdditionalImages?: boolean;
}

export const CatModal = ({
  onClose,
  imageData,
  favorite,
  showAdditionalImages,
}: CatModalProps) => {
  useStyle("body {  overscroll-behavior-x: none; }");

  return (
    <div
      onClick={sameTargetListener(onClose)}
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/25 p-8"
    >
      <div
        className={classNames(
          "relative flex max-h-full flex-col overflow-auto rounded-lg bg-white shadow-lg",
          imageData.breed ? "p-4" : "p-8"
        )}
      >
        <IconButton
          onClick={containTargetListener(onClose)}
          shape="square"
          className="no-animation absolute top-0 right-0"
        >
          <IconClose />
        </IconButton>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <figure className="flex justify-center p-4">
              <Image
                className="max-w-lg"
                src={imageData.image.src}
                alt={imageData.image.alt}
                width={imageData.image.width}
                height={imageData.image.height}
              />
            </figure>
            {imageData.breed && <CatTags tags={imageData.breed.tags} />}
            <div className="flex items-center px-2">
              {favorite && (
                <IconButton
                  disabled={favorite.isFetching}
                  onClick={favorite.onClick}
                  isLoading={favorite.isLoading}
                >
                  <IconHeart
                    className={classNames(
                      "stroke-primary",
                      favorite.isFavorite ? "fill-primary" : "fill-transparent"
                    )}
                  />
                </IconButton>
              )}
              {imageData.breed && (
                <h2 className="p-2 text-lg font-bold">
                  {imageData.breed.name}
                </h2>
              )}
            </div>
          </div>
          <div className="hidden flex-shrink-0 flex-col md:flex">
            {imageData.breed && <CatStats stats={imageData.breed.stats} />}
          </div>
        </div>
        {imageData.breed && (
          <p className="p-4 pt-0">{imageData.breed.description}</p>
        )}
        <div className="block md:hidden">
          {imageData.breed && (
            <CatStats fullWidth stats={imageData.breed.stats} />
          )}
        </div>
        {imageData.breed && showAdditionalImages && (
          <AdditionalImages breedId={imageData.breed.id} />
        )}
      </div>
    </div>
  );
};
