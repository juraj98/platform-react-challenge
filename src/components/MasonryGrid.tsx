import { useElementSize } from "hooks/useElementSize";
import type { ReactNode } from "react";
import { useMemo, useRef } from "react";

export interface MasonryGridProps {
  items: {
    element: ReactNode;
    size: {
      height: number;
      width: number;
    };
  }[];
}

const COLUMN_WIDTH_PX = 384;
const GAP_PX = 20;

export const MasonryGrid = ({ items }: MasonryGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useElementSize(containerRef);

  const numberOfColumns = useMemo(
    () =>
      Math.max(1, Math.floor((width + GAP_PX) / (COLUMN_WIDTH_PX + GAP_PX))),
    [width]
  );

  const columns = useMemo(() => {
    return items.reduce<{ currentHeight: number; elements: ReactNode[] }[]>(
      (acc, { element, size }) => {
        if (!acc[0]) return null as never;
        const aspectRatio = size.width / size.height;
        const adjustedHeight = COLUMN_WIDTH_PX / aspectRatio;

        acc[0].elements.push(element);
        acc[0].currentHeight += adjustedHeight + GAP_PX;

        return acc.sort((a, b) => a.currentHeight - b.currentHeight);
      },
      Array.from({ length: numberOfColumns }, () => ({
        currentHeight: 0,
        elements: [],
      }))
    );
  }, [items, numberOfColumns]);

  return (
    <div className="flex justify-center gap-5" ref={containerRef}>
      {columns.map((column, index) => {
        return (
          <div key={index} className="flex flex-col gap-5">
            {column.elements}
          </div>
        );
      })}
    </div>
  );
};
