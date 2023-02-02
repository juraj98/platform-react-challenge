import type { ReactNode } from "react";
import { useState } from "react";
import useStyle from "../../hooks/useStyle";

export interface ImageCardBackgroundProps {
  children: ReactNode;
}

const ANIMATION_DURATION = 500;

export default function ImageCardBackground({
  children,
}: ImageCardBackgroundProps) {
  const [opened, setOpened] = useState(false);

  const startFrom = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  useStyle(`
    @keyframes background-start {
      from { background-color: transparent; }
      to { background-color: rgba(0, 0, 0, 0.2); }
    }

    @keyframes card-start {
      0% {
        display: none;
        top: ${startFrom.top}px;
        left: ${startFrom.left}px;
        max-width: ${startFrom.width}px;
        max-height: ${startFrom.height}px;
      }

      50% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      100% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
  `);

  return (
    <div
      className="fixed top-0 left-0 z-10 h-screen w-screen transition-all"
      style={{
        position: opened ? "fixed" : "relative",
        animationName: "background-start",
        animationFillMode: "forwards",
        animationDirection: opened ? "normal" : "reverse",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationIterationCount: opened ? "1" : "2",
        animationComposition: "add",
        animationDuration: `${ANIMATION_DURATION}ms`,
        transitionDuration: `${ANIMATION_DURATION}ms`,
      }}
    >
      <div
        className="absolute rounded-xl bg-blue-400 transition-all"
        style={{
          animationName: "card-start",
          animationFillMode: "forwards",
          animationDirection: opened ? "normal" : "reverse",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          animationIterationCount: opened ? "1" : "2",
          animationComposition: "add",
          animationDuration: `${ANIMATION_DURATION}ms`,
          transitionDuration: `${ANIMATION_DURATION}ms`,
        }}
      >
        <div className="h-[50rem] w-[50rem]">{children}</div>
      </div>
    </div>
  );
}
