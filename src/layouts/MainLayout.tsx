import type { ReactElement } from "react";

import Link from "next/link";
import { Logo } from "../components/Logo";

export const MainLayout = (page: ReactElement) => {
  return (
    <div className="min-h-screen">
      <header className="supports-backdrop-blur:bg-white/60 sticky top-0 z-10 w-full flex-none border-b border-slate-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <div className="flex select-none items-center gap-4 px-4 py-4">
            <Logo />
            <nav className="text-sm font-semibold leading-6 text-slate-700">
              <ul className="flex  space-x-8">
                <li>
                  <Link href="/" className="hover:text-sky-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/breeds" className="hover:text-sky-500">
                    Breeds
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="hover:text-sky-500">
                    Favorites
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-8">{page}</main>
    </div>
  );
};
