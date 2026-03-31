import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const robotoSlabHeading = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview AI",
  description:
    "An AI-powered interview preparation tool that helps you practice and improve your interview skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        roboto.variable,
        robotoSlabHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="bg-gray-100 dark:bg-gray-900 flex-1 overflow-y-auto pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
