import type { RefObject } from "react";
import { useCallback, useState } from "react";
import { useOnResize } from "./useOnResize";

export interface ElementSize {
  width: number;
  height: number;
}

export const useElementSize = <E extends HTMLElement>(
  ref: RefObject<E | undefined>
) => {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  const resizeHandler = useCallback(
    (resizeObserverEntry?: ResizeObserverEntry) => {
      if (!resizeObserverEntry) return;

      const { clientWidth, clientHeight } = resizeObserverEntry.target;

      if (size?.width === clientWidth && size?.height === clientHeight) return;

      setSize({ width: clientWidth, height: clientHeight });
    },
    [size, setSize]
  );

  useOnResize(ref, resizeHandler);

  return size;
};
