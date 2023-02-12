import { useRouter } from "next/router";
import { useEffect } from "react";

const Image = () => {
  const router = useRouter();

  useEffect(() => {
    void router.replace("/");
  }, [router]);

  return null;
};

export default Image;
