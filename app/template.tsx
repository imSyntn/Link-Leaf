import { LoaderWrapper } from "@/components/Loader";
import { Suspense } from "react";


export default function Template({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoaderWrapper />}>{children}</Suspense>;
}
