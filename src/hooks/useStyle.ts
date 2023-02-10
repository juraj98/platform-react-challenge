import { useEffect, useRef } from "react";

const useStyle = (css: string | null) => {
  const elementRef = useRef<HTMLStyleElement>();

  useEffect(() => {
    const node = document.createElement("style");
    elementRef.current = node;
    document.head.appendChild(node);

    return () => {
      document.head.removeChild(node);
    };
  }, []);

  useEffect(() => {
    if (elementRef.current) elementRef.current.innerHTML = css || "";
  }, [css]);
};

export default useStyle;
