import axios from "axios";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import type { NormalizedImageData } from "server/api/routers/images";
import { ImageData, normalizeImageData } from "server/api/routers/images";
import { Home } from "routes/Home/Home";
import { MainLayout } from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

interface ImageProps {
  imageFromUrl?: NormalizedImageData;
}

const ImagePage: NextPageWithLayout<ImageProps> = ({ imageFromUrl }) => {
  return (
    <>
      <Head>
        <title>Meower - The best cat pictures</title>
        <meta
          name="description"
          content={
            imageFromUrl?.breed
              ? `Picture of a ${imageFromUrl.breed.name}! Learn interesting details about your furry friend on Meower, the ultimate cat image library.`
              : `Picture of a cat! Learn interesting details about your furry friend on Meower, the ultimate cat image library.`
          }
          key="desc"
        />
        {imageFromUrl && (
          <meta property="og:image" content={imageFromUrl.image.src} />
        )}
      </Head>
      <Home imageFromUrl={imageFromUrl} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ImageProps> = async ({
  params,
}) => {
  if (!params || typeof params.imageId !== "string")
    return {
      props: {},
    };

  const response = await axios.get(
    `https://api.thecatapi.com/v1/images/${params.imageId}`
  );

  return {
    props: {
      imageFromUrl: normalizeImageData(ImageData.parse(response.data)),
    },
  };
};

ImagePage.getLayout = MainLayout;

export default ImagePage;
