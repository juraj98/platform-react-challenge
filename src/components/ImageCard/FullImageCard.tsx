import { useEffect, useRef, useState } from "react";
import useCss from "../../hooks/useCss";
import type { ImageCardProps } from "./ImageCard";
import { ImageCard } from "./ImageCard";

const ANIMATION_DURATION = 1000;

export interface FullImageCardProps extends ImageCardProps {
  startFrom: DOMRect;
  onClose: () => void;
}

export default function FullImageCard({
  startFrom,
  onClose,
  ...imageCardProps
}: FullImageCardProps) {
  const [animate, setAnimate] = useState(false);
  useCss(`
    @keyframes expand {
      from {
        top: ${startFrom.top}px;
        left: ${startFrom.left}px;
        max-width: ${startFrom.width}px;
        max-height: ${startFrom.height}px;
        transform: translate(0%, 0%);
    }

    to {
        top: 50%;
        left: 50%;
        max-width: calc(100vw-5rem);
        max-height: calc(100vh-5rem);
        transform: translate(-50%, -50%);
    }
  
  `);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed top-0 z-40 h-screen w-screen overflow-auto bg-black/25 p-10"
    >
      <div
        style={{
          animationName: "expand",
          animationFillMode: "forwards",
          animationDuration: `${ANIMATION_DURATION}ms`,
          animationIterationCount: 1,
        }}
        className="fixed m-10 flex w-full items-center justify-center overflow-auto  "
      >
        <ImageCard {...imageCardProps} expanded={animate} />
      </div>
    </div>
  );
}
