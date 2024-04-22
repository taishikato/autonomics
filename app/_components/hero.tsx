"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/magicui/border-beam";
import RetroGrid from "@/components/magicui/retro-grid";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import AppScreenshot from "../_assets/app-screenshot.webp";
import { APP_NAME } from "@/utils/consts";

export const Hero = () => {
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  });

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="hero">
      <div className="relative h-full overflow-hidden py-14">
        <RetroGrid className="z-0" />
        <div className="container z-10 flex flex-col">
          <div className="mt-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8 text-center">
              <motion.h1
                ref={fadeInRef}
                className="text-balance bg-gradient-to-br from-black from-30% to-black/60 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Get more convertion without extra effort
              </motion.h1>

              <motion.p
                className="text-balance text-lg tracking-tight text-gray-400 md:text-xl"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                {APP_NAME} automatically optimizes the text for your landing
                page's CTA button. In the future, our goal is to create websites
                that automatically repair and update themselves.
              </motion.p>

              <div className="flex items-center justify-center gap-x-8">
                <motion.div
                  animate={fadeInInView ? "animate" : "initial"}
                  variants={fadeUpVariants}
                  className="flex flex-col gap-4 lg:flex-row"
                  initial={false}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.21, 0.47, 0.32, 0.98],
                    type: "spring",
                  }}
                >
                  <Link
                    href="/login"
                    className={cn(
                      // colors
                      "bg-black  text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90",

                      // layout
                      "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",

                      // animation
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                    )}
                  >
                    Sign up / Sign in
                    <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.div
                  animate={fadeInInView ? "animate" : "initial"}
                  variants={fadeUpVariants}
                  className="flex flex-col gap-4 lg:flex-row"
                  initial={false}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.21, 0.47, 0.32, 0.98],
                    type: "spring",
                  }}
                >
                  <a
                    href="https://github.com/taishikato/autonomics"
                    target="_blank"
                    className={cn(
                      // colors
                      "bg-black  text-white shadow hover:bg-black/90 dark:bg-secondary dark:hover:bg-secondary/80 dark:text-secondary-foreground",

                      // layout
                      "group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",

                      // animation
                      "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
                    )}
                  >
                    <FaGithub className="size-4" />
                    GitHub
                    <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            initial={false}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98],
              type: "spring",
            }}
            className="relative mx-auto mt-24 h-full w-full max-w-[768px] rounded-xl border shadow-2xl"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)]",

                // light styles
                "[background-image:linear-gradient(to_bottom,#ffaa40,transparent_30%)]",

                // dark styles
                "dark:[background-image:linear-gradient(to_bottom,#ffffff,transparent_30%)]"
              )}
            />

            <Image
              src={AppScreenshot.src}
              width={AppScreenshot.width}
              height={AppScreenshot.height}
              alt="App screenshot"
              role="img"
              className="w-full"
            />
            <BorderBeam />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
