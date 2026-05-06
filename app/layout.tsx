import type { Metadata } from "next";
import { Inter, Tenor_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { CartProvider } from "@/lib/cart";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tenor = Tenor_Sans({ subsets: ["latin"], weight: "400", variable: "--font-tenor" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "Schoppmann — Crayons réutilisables usinés au Québec",
    template: "Schoppmann | %s",
  },
  description:
    "Crayons en aluminium usinés à la main à Sainte-Brigitte-de-Laval, Québec. Mine infinie, durables, premium. Gamme golf, crayons hybrides, recharges.",
  keywords: ["crayon infini", "crayon aluminium", "crayon réutilisable", "crayon golf", "fait au Québec", "cadeau entreprise Québec"],
  openGraph: {
    siteName: "Schoppmann",
    locale: "fr_CA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr-CA"
      className={`${inter.variable} ${tenor.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-lin text-charbon">
        <CartProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </CartProvider>
      </body>
    </html>
  );
}
