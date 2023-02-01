import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

const Image: NextPageWithLayout = () => {
  const router = useRouter();
  const { imageId } = router.query;

  return <div>Image {imageId}</div>;
};

Image.getLayout = MainLayout;

export default Image;
