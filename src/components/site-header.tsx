import Link from "next/link";
import { Icons } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">Toolbox</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
