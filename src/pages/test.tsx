import LoadingGrid from "../components/LoadingGrid";
import Modal from "../components/modals/Modal";
import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";

const Test: NextPageWithLayout = () => {
  return (
    <div>
      <h2 className="mb-6 text-xl">Images</h2>
      <LoadingGrid />
    </div>
  );
};

Test.getLayout = MainLayout;

export default Test;
