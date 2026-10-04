import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Archivo, Shippori_Mincho_B1 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StickyCta } from "@/components/site/StickyCta";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { site } from "@/content/site";

const noto = Noto_Sans_JP({ weight: ["400", "500", "700", "900"], subsets: ["latin"], display: "swap", variable: "--font-noto", preload: false });
const archivo = Archivo({ weight: ["500", "700", "900"], subsets: ["latin"], display: "swap", variable: "--font-archivo" });
const shippori = Shippori_Mincho_B1({ weight: ["500"], subsets: ["latin"], display: "swap", variable: "--font-shippori", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "熊本の警備会社｜交通誘導・雑踏警備・身辺警護（4号）｜株式会社OU警備保障",
    template: "%s｜株式会社OU警備保障",
  },
  description: `熊本の警備会社。熊本県全域の交通誘導・雑踏警備・道路規制（2号）と、全国対応の身辺警護・ボディガード（4号警備）、店舗・民泊清掃。${site.license.label}、警備員${site.stats.guards}名・平均年齢${site.stats.averageAge}歳。24時間365日、電話・LINEで即相談。`,
  applicationName: site.shortName,
  openGraph: { type: "website", locale: "ja_JP", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#182253",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${archivo.variable} ${shippori.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-bg focus:px-4 focus:py-2 focus:text-ink">本文へ移動</a>
        <Header />
        <main id="main" className="pb-20 lg:pb-0">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
