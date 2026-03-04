import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EIGH",
  description: "Platform Analisis Kripto dengan Terminal High-Frequency dan Dashboard Terpadu",
};

/**
 * Root layout component that applies global fonts and theme, renders the site header, and wraps page content.
 *
 * Applies the Geist Sans and Geist Mono variable fonts as body classes, sets the document language to English, enables the dark theme, and renders the Header followed by the provided page children.
 *
 * @param children - The page content to render inside the layout.
 * @returns The root HTML structure (<html> and <body>) containing the Header and `children`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
