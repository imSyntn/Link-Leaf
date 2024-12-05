import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from './UserContext'
import { Navbar } from "@/components/NavBar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark h-[100vh] relative`}
      >
        {/* <div className="h-[100vh] overflow-y-auto"> */}
        {/* <header className="fixed h-[75px] w-full border border-emerald-200 z-10 pointer-events-none bg-black backdrop-blur-md"> */}
        {/* </header> */}
          <Link href={'/'} className="fixed top-0 left-7 text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed [lg:leading-snug] z-50 sm:top-3">
            <Highlight className="text-black text-lg sm:text-3xl dark:text-white z-20">
              Link Leaf
            </Highlight>
          </Link>
          <Navbar />
        <HeroHighlight containerClassName="">

          <UserContextProvider>
            {children}
          </UserContextProvider>

        </HeroHighlight>

        <Toaster />
        {/* <HeroHighlight>
            <Footer />
          </HeroHighlight> */}
        {/* </div> */}
      </body>
    </html>
  );
}
