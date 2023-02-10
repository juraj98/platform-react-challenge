import type { NormalizedCatData } from "../../api";
import CatTags from "./components/CatTags";
import CatFavoriteButton from "./components/CatFavoriteButton";
import CatImage from "./components/CatImage";
import CatName from "./components/CatName";
import CatStats from "./components/CatStats";
import { CatDescription } from "./components/CatDescription";
import IconButton from "../IconButton";
import IconClose from "../icons/IconClose";
import type { MouseEvent } from "react";

export interface CatModalProps {
  catData: NormalizedCatData;
  onClose: (event: MouseEvent<HTMLElement>) => void;
}

const CatModal = ({ catData, onClose }: CatModalProps) => {
  const breed = catData.breeds?.[0];

  if (!breed) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose(event);
      }}
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/25 p-8"
    >
      <div className="relative flex max-h-full flex-col overflow-auto rounded-lg bg-white p-4 shadow-lg">
        <IconButton
          onClick={(event) => {
            if ((event.currentTarget as HTMLElement).contains(event.target))
              onClose(event);
          }}
          shape="square"
          className="no-animation absolute top-0 right-0"
        >
          <IconClose />
        </IconButton>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <CatImage catData={catData} />
            <CatTags catData={catData} />
            <div className="flex items-center px-2">
              <CatFavoriteButton catData={catData} />
              <CatName catData={catData} />
            </div>
          </div>
          <div className="hidden flex-shrink-0 flex-col md:flex">
            <CatStats catData={catData} />
          </div>
        </div>
        <CatDescription catData={catData} />
        <div className="block md:hidden">
          <CatStats catData={catData} />
        </div>
      </div>
    </div>
  );
};

export default CatModal;
