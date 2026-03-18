"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { navigationConfig } from "@/config/navigation";

import styles from "./Navbar.module.css";

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <PageContainer>
        <div className={styles.row}>
          <Link aria-label="Go to homepage" className={styles.logo} href="/">
            {navigationConfig.logoLabel}
          </Link>

          <nav aria-label="Primary" className={styles.desktopNav}>
            <ul className={`${styles.linkList} nav-readable-list`}>
              {navigationConfig.items.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`${styles.link} nav-readable-link ${isRouteActive(pathname, item.href) ? styles.active : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.desktopCtas}>
            <Link className={styles.loginLink} href={navigationConfig.ctas.secondary.href}>
              {navigationConfig.ctas.secondary.label}
            </Link>
            <Button className={styles.trialCta} href={navigationConfig.ctas.primary.href} size="md" variant="primary">
              {navigationConfig.ctas.primary.label}
            </Button>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMobileOpen}
            aria-label={navigationConfig.mobileMenuAriaLabel}
            className={styles.mobileToggle}
            onClick={() => setIsMobileOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`${styles.mobilePanel} ${isMobileOpen ? styles.mobileOpen : ""}`} id="mobile-navigation">
          <nav aria-label="Mobile primary">
            <ul className={`${styles.mobileList} nav-readable-list`}>
              {navigationConfig.items.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`${styles.mobileLink} nav-readable-link ${isRouteActive(pathname, item.href) ? styles.active : ""}`}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileCtas}>
            <Link className={styles.mobileLoginLink} href={navigationConfig.ctas.secondary.href}>
              {navigationConfig.ctas.secondary.label}
            </Link>
            <Button className={styles.mobileCta} href={navigationConfig.ctas.primary.href} variant="primary">
              {navigationConfig.ctas.primary.label}
            </Button>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
