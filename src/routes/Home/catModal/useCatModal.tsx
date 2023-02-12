import { useMemo, useState } from "react";
import type { NormalizedCatData } from "../../../api";
import useStyle from "../../../hooks/useStyle";
import { useCatFavorite } from "./useCatFavorite";
import CatModal from "../../../components/CatModal/CatModal";

const useCatModal = (images?: NormalizedCatData[], requiredId?: string) => {
  const [activeCatId, setActiveCatId] = useState<string | null>(
    requiredId || null
  );

  const favorite = useCatFavorite(activeCatId);

  useStyle(activeCatId ? "body { overflow: hidden; }" : "");

  const activeCatData = useMemo(() => {
    return images?.find((catData) => catData.id === activeCatId);
  }, [activeCatId, images]);

  const node = activeCatData ? (
    <CatModal
      mainImage={{
        src: activeCatData.url,
        alt: activeCatData.breeds[0]?.name || "Cat",
        width: activeCatData.width,
        height: activeCatData.height,
      }}
      favorite={favorite}
      breed={activeCatData?.breeds[0]}
      onClose={() => {
        setActiveCatId(null);
        window.history.pushState({}, "", `/`);
      }}
    />
  ) : null;

  return {
    node,
    setActiveCatId,
  };
};

export default useCatModal;
