import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from './UserContext'
import { Navbar } from "@/components/NavBar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Link Leaf",
  description: "Your all-in-one hub to organize and share links effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark h-[100vh]`}
      >
        <h1 className="fixed top-3 left-7 text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug z-50">
          <Highlight className="text-black dark:text-white">
            Link Leaf
          </Highlight>
        </h1>
        <Navbar />
        <HeroHighlight containerClassName="h-[100vh]">

          <UserContextProvider>
            {children}
          </UserContextProvider>

        </HeroHighlight>

        <Toaster />
      </body>
    </html>
  );
}
