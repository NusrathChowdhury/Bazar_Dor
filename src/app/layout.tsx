import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NavLinks from "@/components/NavLinks";
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "বাজার দর | আজকের বাজারের দাম",
    description:
        "চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <Marquee />

        <main className="flex-1">
          {children}
        </main>

        <Footer /></body>
    </html>
  );
}
