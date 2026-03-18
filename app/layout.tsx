import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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

export const metadata: Metadata = defaultMetadata;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KVQBH6RJ');`}
        </Script>
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KVQBH6RJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
