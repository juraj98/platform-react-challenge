import type { RefObject } from "react";
import { useEffect, useRef } from "react";

export const useOnResize = (
  ref: RefObject<Element | null | undefined> | null | undefined,
  callback: (resizeObserverEntry?: ResizeObserverEntry) => void
) => {
  const observer = useRef<ResizeObserver>(
    new ResizeObserver(([resizeObserverEntry]) => {
      callback(resizeObserverEntry);
    })
  );

  useEffect(() => {
    observer.current = new ResizeObserver(([resizeObserverEntry]) => {
      callback(resizeObserverEntry);
    });
  }, [callback]);

  useEffect(() => {
    if (!ref?.current) return undefined;

    const node = ref.current;

    observer.current.observe(node);

    return () => {
      observer.current.unobserve(node);
    };
  }, [ref]);
};
