import { useEffect } from "react";

export default function useStyle(style: string) {
  useEffect(() => {
    const element = document.createElement("style");
    element.innerHTML = style;
    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [style]);
}
