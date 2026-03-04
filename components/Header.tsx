"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearchModal = () => setIsSearchOpen((prev) => !prev);

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="/logo.svg" alt="EIGH logo" width={132} height={40} />
        </Link>

        <nav>
          <Link
            href="/"
            className={cn("nav-link", { "is-active": pathname === "/", "is-home": true })}
          >
            Home
          </Link>

          <button
            type="button"
            className="nav-link"
            aria-haspopup="dialog"
            aria-expanded={isSearchOpen}
            onClick={toggleSearchModal}
          >
            Open search
          </button>

          <Link
            href="/coins"
            className={cn("nav-link", { "is-active": pathname.startsWith("/coins") })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Header;
