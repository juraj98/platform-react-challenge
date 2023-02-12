import Head from "next/head";
import { MainLayout } from "../layouts/MainLayout";
import type { HomeProps } from "../routes/Home/Home";
import { Home } from "../routes/Home/Home";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout<HomeProps> = ({ imageFromUrl }) => {
  return (
    <>
      <Head>
        <title>Meower - The ultimate cat image library</title>
        <meta
          name="description"
          content="Get your daily dose of cuteness! Explore a collection of random cat images on Meower, the ultimate cat image library. Find your new favorite feline friend."
          key="desc"
        />
      </Head>
      <Home imageFromUrl={imageFromUrl} />
    </>
  );
};

HomePage.getLayout = MainLayout;

export default HomePage;
