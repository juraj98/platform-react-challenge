import type { NormalizedCatData } from "../../api";
import Card from "./Card";

export interface CatCardProps {
  catData: NormalizedCatData;
  setActiveCatId: (catId: string) => void;
}

const CatCard = ({ catData, setActiveCatId }: CatCardProps) => {
  return (
    <Card
      key={catData.id}
      label={catData.breeds[0]?.name || "Unknown"}
      image={{
        src: catData.url,
        width: catData.width,
        height: catData.height,
        alt: catData.breeds[0]?.name || "Cat",
      }}
      link={{
        href: `/images/${catData.id}`,
        onClick: (event) => {
          event.preventDefault();
          event.stopPropagation();

          setActiveCatId(catData.id);

          if (window) {
            window.history.pushState(
              { catId: catData.id },
              "",
              `/image/${catData.id}`
            );
          }
        },
      }}
    />
  );
};

export default CatCard;
