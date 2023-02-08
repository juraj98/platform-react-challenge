import { Collapse } from "../../Collapse";
import IconHeart from "../../icons/IconHeart";
import type { ImageCardProps } from "../ImageCard";

export const ImageCardFavoriteButton = ({ expanded }: ImageCardProps) => {
  return (
    <Collapse
      direction="horizontal"
      expandedClassName="pl-4"
      expanded={expanded}
    >
      <button className="btn-ghost btn-circle btn">
        <IconHeart className="fill-transparent stroke-primary" />
      </button>
    </Collapse>
  );
};
