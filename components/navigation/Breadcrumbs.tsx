"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routeTitleByPath } from "@/content/site-content";
import { PageContainer } from "@/components/layout/PageContainer";

import styles from "./Breadcrumbs.module.css";

type BreadcrumbItem = {
  href: string;
  label: string;
};

function toTitleFromSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolvePathLabel(path: string): string {
  return routeTitleByPath[path] ?? toTitleFromSegment(path.split("/").filter(Boolean).slice(-1)[0] ?? "Home");
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === "/") {
    return [{ href: "/", label: "Home" }];
  }

  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ href: "/", label: "Home" }];

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    items.push({
      href: currentPath,
      label: resolvePathLabel(currentPath)
    });
  }

  return items;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <div className={styles.wrapper}>
      <PageContainer>
        <nav aria-label="Breadcrumb" className={styles.nav}>
          <ol className={styles.list}>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li className={styles.item} key={item.href}>
                  {isLast ? (
                    <span aria-current="page" className={styles.current}>
                      {item.label}
                    </span>
                  ) : (
                    <Link className={styles.link} href={item.href}>
                      {item.label}
                    </Link>
                  )}

                  {!isLast ? <span aria-hidden className={styles.separator}>/</span> : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </PageContainer>
    </div>
  );
}
