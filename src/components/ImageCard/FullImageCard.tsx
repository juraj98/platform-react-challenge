import type { ImageCardProps } from "./ImageCard";
import { ImageCard } from "./ImageCard";

export interface FullImageCardProps extends ImageCardProps {
  onClose: () => void;
}

export default function FullImageCard({
  onClose,
  ...imageCardProps
}: FullImageCardProps) {
  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed top-0 z-40 h-screen w-screen overflow-auto bg-black/25 p-10"
    >
      <div className="fixed m-10 flex h-screen w-screen items-center justify-center overflow-auto  ">
        <ImageCard {...imageCardProps} expanded={true} />
      </div>
    </div>
  );
}
