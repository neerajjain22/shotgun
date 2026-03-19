"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Footer } from "@/components/footer/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Navbar } from "@/components/navigation/Navbar";

type SiteShellProps = {
  children: ReactNode;
};

function isLandingPagePath(pathname: string): boolean {
  return pathname === "/lp" || pathname.startsWith("/lp/");
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isLandingPage = isLandingPagePath(pathname);

  return (
    <div className="site-frame">
      {!isLandingPage ? <Navbar /> : null}
      {!isLandingPage ? <Breadcrumbs /> : null}
      <main className="site-main">{children}</main>
      {!isLandingPage ? <Footer /> : null}
    </div>
  );
}
