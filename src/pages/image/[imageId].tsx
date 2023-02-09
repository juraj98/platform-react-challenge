import { useRouter } from "next/router";
import Home from "..";
import MainLayout from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

const Image: NextPageWithLayout = () => {
  const router = useRouter();
  const { imageId } = router.query;

  return typeof imageId === "string" ? <Home requiredId={imageId} /> : <Home />;
};

Image.getLayout = MainLayout;

export default Image;
