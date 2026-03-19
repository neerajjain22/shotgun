"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type CtaTrackedLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function CtaTrackedLink({ children, className, href }: CtaTrackedLinkProps) {
  const handleClick = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cta_clicked",
      page: "lp-shopify-dev-team"
    });
  };

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
