import { useRouter } from "next/router";
import MainLayout from "../../layouts/MainLayout";
import type { NextPageWithLayout } from "../_app";

const Breed: NextPageWithLayout = () => {
  const router = useRouter();
  const { breedId } = router.query;

  return <div>Breed {breedId}</div>;
};

Breed.getLayout = MainLayout;

export default Breed;
