import Image from "next/image";
import IconHeart from "./icons/IconHeart";
import Tags from "./Tags";
import Stats from "./Stats";
import cx from "classnames";
import type { NormalizedCatData } from "../api";
import { useEffect, useState } from "react";

export interface FullImageCardProps {
  catData: NormalizedCatData;
  startFrom?: DOMRect;
  onClose: () => void;
}

export default function FullImageCard({
  catData,
  startFrom,
  onClose,
}: FullImageCardProps) {
  const [collapsed, setCollapsed] = useState(true);
  const breed = catData.breeds && catData.breeds[0];

  useEffect(() => {
    setCollapsed(false);
  }, []);

  console.log(startFrom);

  return (
    <div
      style={
        collapsed
          ? {
              background: "transparent",
              boxShadow: "none",
            }
          : undefined
      }
      onClick={onClose}
      className="fixed top-0 left-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-black/30 transition-all"
    >
      <div
        style={
          collapsed
            ? {
                top: startFrom?.top,
                left: startFrom?.left,
                maxWidth: startFrom?.width,
                maxHeight: startFrom?.height,
              }
            : {}
        }
        className={cx(
          "max-w-screen card fixed m-8 flex max-h-screen max-h-full w-fit flex-col gap-6 overflow-auto bg-base-100 p-6 shadow-xl transition-all",
          collapsed && "gap-0 p-0"
        )}
      >
        <div
          className={cx(
            "flex flex-row gap-6 overflow-auto transition-all",
            collapsed && "gap-0"
          )}
        >
          <figure
            className={`flex-1 max-w-[${catData.width}] max-h-[${catData.height}]`}
          >
            <Image
              src={catData.url}
              height={catData.height}
              width={catData.width}
              alt="Cat"
              className={cx(
                "max-h-full max-w-full object-cover transition-all",
                collapsed && "rounded-t-xl"
              )}
            />
          </figure>
          <Stats
            stats={breed?.stats}
            className={cx(
              "hidden w-56 whitespace-pre transition-all md:block",
              collapsed && "w-0 py-4"
            )}
          />
        </div>

        <div
          className={cx(
            "items-top  flex shrink-0 justify-between overflow-hidden transition-all",
            collapsed ? "h-0 px-4" : "h-12"
          )}
        >
          <Tags tags={breed?.tags} className="h-full" />
          <button className="btn-ghost btn-circle btn">
            <IconHeart className="fill-transparent stroke-primary" />
          </button>
        </div>
        <div className="shrink-0">
          {breed && (
            <h2
              className={cx(
                "text-xl font-semibold transition-all",
                collapsed ? "p-4" : "pb-1"
              )}
            >
              {breed.name}
            </h2>
          )}
          {breed && (
            <div
              className={cx(
                "grid-row grid overflow-hidden transition-all",
                collapsed ? "grid-rows-[0fr] px-4" : "grid-rows-[1fr] px-0"
              )}
            >
              <p className="min-h-0">{breed.description}</p>
            </div>
          )}
        </div>
        <div
          className={cx(
            "grid-row grid overflow-hidden transition-all",
            collapsed ? "grid-rows-[0fr] px-4" : "grid-rows-[1fr] px-0"
          )}
        >
          <Stats stats={breed?.stats} className="block min-h-0 md:hidden" />
        </div>
      </div>
    </div>
  );
}
