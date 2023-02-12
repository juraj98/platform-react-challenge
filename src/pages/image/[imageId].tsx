import type { GetServerSideProps } from "next";
import Head from "next/head";
import Home from "..";
import type { NormalizedCatData } from "../../api";
import { getImageById } from "../../api";
import MainLayout from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

interface ImageProps {
  requiredCat: NormalizedCatData;
}

const ImagePage: NextPageWithLayout<ImageProps> = (props) => {
  const breed = props.requiredCat.breeds?.[0];

  return (
    <>
      <Head>
        <title>Meower - The best cat pictures</title>
        <meta
          name="description"
          content={
            breed
              ? `Picture of a ${breed.name}! Learn interesting details about your furry friend on Meower, the ultimate cat image library.`
              : `Picture of a cat! Learn interesting details about your furry friend on Meower, the ultimate cat image library.`
          }
          key="desc"
        />
      </Head>
      <Home requiredCat={props.requiredCat} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ImageProps> = async ({
  params,
}) => ({
  props: {
    requiredCat: await getImageById(params?.imageId as string),
  },
});

ImagePage.getLayout = MainLayout;

export default ImagePage;
