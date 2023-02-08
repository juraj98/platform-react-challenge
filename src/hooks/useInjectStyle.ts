import { useCallback, useEffect, useRef } from "react";

export default function useStyleInjection() {
  const element = useRef<HTMLStyleElement>(document.createElement("style"));

  useEffect(() => {
    const node = element.current;

    document.head.appendChild(node);

    return () => {
      document.head.removeChild(node);
    };
  }, [element]);

  return useCallback((style: string) => {
    element.current.innerHTML = style;
  }, []);
}
