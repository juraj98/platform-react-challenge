import { useEffect } from "react";

export default function useCss(css: string) {
  useEffect(() => {
    const style = document.createElement("style");

    style.innerHTML = css;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [css]);
}
