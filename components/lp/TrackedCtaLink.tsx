"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type TrackedCtaLinkProps = {
  children: ReactNode;
  className?: string;
  eventPage: string;
  href: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function pushCtaEvent(eventPage: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cta_clicked",
    page: eventPage
  });
}

export function TrackedCtaLink({ children, className, eventPage, href }: TrackedCtaLinkProps) {
  const handleClick = () => {
    pushCtaEvent(eventPage);
  };

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a className={className} href={href} onClick={handleClick}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={handleClick}>
      {children}
    </Link>
  );
}
