import Head from "next/head";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Cat site</title>
        <meta name="description" content="Cat site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Home</main>
    </>
  );
};

Home.getLayout = MainLayout;

export default Home;
