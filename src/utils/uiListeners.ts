import type { UIEvent } from "react";

export const containTargetListener =
  <E extends UIEvent>(callback: (event: E) => void) =>
  (event: E) => {
    if (event.currentTarget.contains(event.target as Node)) {
      callback(event);
    }
  };

export const sameTargetListener =
  <E extends UIEvent>(callback: (event: E) => void) =>
  (event: E) => {
    if (event.currentTarget === event.target) {
      callback(event);
    }
  };
