import Head from "next/head";

import MainLayout from "../layouts/MainLayout";
import { Favorites } from "../routes/Favorites";
import type { NextPageWithLayout } from "./_app";

const FavoritesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Favorites | Meower - The ultimate cat image library</title>
        <meta
          name="description"
          content="Your personal cat gallery! View and keep track of your favorite cats on Meower, the ultimate cat image library. Save and revisit the cutest felines anytime."
          key="desc"
        />
      </Head>
      <Favorites />
    </>
  );
};

FavoritesPage.getLayout = MainLayout;

export default FavoritesPage;
