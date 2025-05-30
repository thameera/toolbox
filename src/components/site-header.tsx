import Link from "next/link";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <HiOutlineWrenchScrewdriver className="w-6 h-6" />
            <span className="hidden font-bold sm:inline-block">Toolbox</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <ModeToggle />
          <a
            href="https://github.com/thameera/toolbox"
            target="_blank"
            className="flex items-center space-x-2"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
}
