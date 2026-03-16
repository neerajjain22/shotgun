import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer/Footer";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Navbar } from "@/components/navigation/Navbar";
import { defaultMetadata } from "@/config/metadata";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap"
});

export const metadata: Metadata = defaultMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${inter.variable} ${plusJakartaSans.variable}`}>
        <div className="site-frame">
          <Navbar />
          <Breadcrumbs />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
