import useStyle from "../../hooks/useStyle";

export interface NewFullImageCardProps {
  startFrom: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  opened: boolean;
}

const ANIMATION_DURATION = 500;

const NewFullImageCard = ({ startFrom, opened }: NewFullImageCardProps) => {
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
        <div className="h-[50rem] w-[50rem]"></div>
      </div>
    </div>
  );
};

export default NewFullImageCard;
