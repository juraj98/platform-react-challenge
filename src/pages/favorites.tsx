import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Favorites: NextPageWithLayout = () => {
  return <div>Favorites</div>;
};

Favorites.getLayout = MainLayout;

export default Favorites;
