import type { NormalizedCatBreed, NormalizedCatData } from "../../api";
import CatTags from "./components/CatTags";
import CatStats from "./components/CatStats";
import IconButton from "../IconButton";
import IconClose from "../icons/IconClose";
import type { MouseEvent } from "react";
import classNames from "classnames";
import {
  containTargetListener,
  sameTargetListener,
} from "../../utils/uiListeners";
import IconHeart from "../icons/IconHeart";
import Image from "next/image";
import type { ImageProps } from "../../utils/image";

export interface CatModalProps {
  onClose: (event: MouseEvent<HTMLElement>) => void;
  extraPhotos?: NormalizedCatData[];
  mainImage: ImageProps;
  breed?: NormalizedCatBreed;
  favorite?: {
    onClick: (event: MouseEvent<HTMLElement>) => void;
    isFetching: boolean;
    isLoading: boolean;
    isFavorite: boolean;
  };
}

const Modal = ({ mainImage, breed, favorite, onClose }: CatModalProps) => {
  return (
    <div
      onClick={sameTargetListener(onClose)}
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/25 p-8"
    >
      <div
        className={classNames(
          "relative flex max-h-full flex-col overflow-auto rounded-lg bg-white shadow-lg",
          breed ? "p-4" : "p-8"
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
                src={mainImage.src}
                alt={mainImage.alt}
                width={mainImage.width}
                height={mainImage.height}
              />
            </figure>
            {breed && <CatTags tags={breed.tags} />}
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
              {breed && <h2 className="p-4 text-lg font-bold">{breed.name}</h2>}
            </div>
          </div>
          <div className="hidden flex-shrink-0 flex-col md:flex">
            {breed && <CatStats stats={breed.stats} />}
          </div>
        </div>
        {breed && <p className="p-4 pt-0">{breed.description}</p>}
        <div className="block md:hidden">
          {breed && <CatStats fullWidth stats={breed.stats} />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
