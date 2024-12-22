import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserContextProvider } from "./UserContext";
import { Navbar } from "@/components/NavBar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import Image from "next/image";

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
      <meta property="og:title" content="Link Leaf" />
      <meta
        property="og:description"
        content="Your all-in-one hub to organize and share links effortlessly."
      />
      <meta property="og:url" content="https://link-leaf.sayantan.site" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Screenshot%202024-11-27%20180817.png"
      />
      <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Link_Leaf-Transparent.png" />
      <link rel="icon" href="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1734521256/favicon_lujpx4.ico" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark h-[100vh] relative scrollbar`}
      >
        <UserContextProvider>
          {/* <div className="h-[100vh] overflow-y-auto"> */}
          {/* <header className="fixed h-[75px] w-full border border-emerald-200 z-10 pointer-events-none bg-black backdrop-blur-md"> */}
          {/* </header> */}
          <Link
            href={"/"}
            className="fixed top-3 left-7 text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed [lg:leading-snug] z-50"
          >
            <Image
              src={
                "https://raw.githubusercontent.com/imSyntn/Static-Files/refs/heads/main/Link_Leaf-Transparent.png"
              }
              width={40}
              height={40}
              alt="Logo"
              className="custom-2:block hidden"
            />
            <Highlight className="text-black custom-2:!hidden block sm:text-3xl dark:text-white z-20">
              Link Leaf
            </Highlight>
          </Link>
          <Navbar />
          <HeroHighlight containerClassName="">{children}</HeroHighlight>

          <Toaster />
          {/* <HeroHighlight>
            <Footer />
          </HeroHighlight> */}
          {/* </div> */}
        </UserContextProvider>
      </body>
    </html>
  );
}
