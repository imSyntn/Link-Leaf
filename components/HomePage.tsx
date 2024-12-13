'use client';
import { motion } from "framer-motion";
import { Highlight } from "@/components/ui/hero-highlight";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter()
    return (
        <div className="h-[100vh] w-full flex flex-col justify-center items-center">
            {/* <HeroHighlight containerClassName="h-[100vh]"> */}
            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl md:leading-relaxed lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
            >
                Your all-in-one hub to organize and share {" "}
                <Highlight className="text-black dark:text-white">
                    links effortlessly
                </Highlight>
                .
            </motion.h1>
            <div className="button-div w-full flex justify-center mt-10">
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" onClick={() => router.push('/signup')}>
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Get Started
                    </span>
                </button>
            </div>
            {/* </HeroHighlight> */}
        </div>
    )
}

export default HomePage