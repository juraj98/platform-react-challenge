import { useMemo, useState } from "react";
import type { NormalizedCatData } from "../../api";
import useStyle from "../../hooks/useStyle";
import CatModal from "./CatModal";

const useCatModal = (images?: NormalizedCatData[]) => {
  const [activeCatId, setActiveCatId] = useState<string | null>(null);

  useStyle(
    activeCatId
      ? `
        body {
          overflow: hidden;
        }
      `
      : ""
  );

  const activeCatData = useMemo(() => {
    return images?.find((catData) => catData.id === activeCatId);
  }, [activeCatId, images]);

  const Modal = activeCatData ? (
    <CatModal onClose={() => setActiveCatId(null)} catData={activeCatData} />
  ) : null;

  return {
    Modal,
    setActiveCatId,
  };
};

export default useCatModal;
