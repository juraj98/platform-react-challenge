import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { Breeds } from "../routes/Breeds/Breeds";

const BreedsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Breeds | Meower - The ultimate cat image library</title>
        <meta
          name="description"
          content="Find your purrfect match! Browse a comprehensive list of cat breeds on Meower, the ultimate cat image library. Discover breed characteristics, history and more."
          key="desc"
        />
      </Head>
      <Breeds />
    </>
  );
};

BreedsPage.getLayout = MainLayout;

export default BreedsPage;
