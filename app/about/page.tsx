"use client"
import { Highlight } from '@/components/ui/hero-highlight'
import { motion } from 'framer-motion'

const AboutPage = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center p-5'>
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
        className="text-md px-4 md:text-2xl lg:text-3xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Welcome to <Highlight className="text-black dark:text-white text-nowrap">
          Link leaf
        </Highlight>, your simple solution for organizing and sharing all your links in one place. We believe in making digital connections seamless and accessible, whether you&apos;re a creator, professional, or someone who just loves staying organized.

        With <Highlight className="text-black dark:text-white text-nowrap">
          Link leaf
        </Highlight>, you can easily create a personalized hub to showcase your content, connect with your audience, and share your world—all in just a few clicks.

        Join us in simplifying the way you share your digital life!
        Your all-in-one hub to organize and share.
      </motion.h1>
    </div>
  )
}

export default AboutPage