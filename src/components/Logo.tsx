import Image from "next/image";
import Link from "next/link";
import catPawSvg from "../assets/images/cat-paw.svg";
import type { ImportedImage } from "../types";

const catPaw = catPawSvg as ImportedImage;

export const Logo = () => {
  return (
    <Link
      href="/"
      className="bold flex flex-1 items-center whitespace-nowrap text-lg"
    >
      <Image src={catPaw.src} width={28} height={28} alt="Cat paw" />
      <span className="pl-4">Meower</span>
    </Link>
  );
};
