import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Main } from "@/components/site/Main";
import { Navbar } from "@/components/site/Navbar";
import { siteConfig } from "@/config/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`
  },
  description: siteConfig.tagline
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="min-h-dvh">
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

