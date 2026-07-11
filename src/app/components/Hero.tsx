"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Button from "./ui/Button";
import { easeOut } from "../utils/animations";

export default function Hero() {
  return (
    <section id="home" className="relative bg-canvas min-h-screen flex flex-col pt-28 md:pt-36">
      <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 w-full space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="display-xxl"
            >
              9 products shipped across web, mobile, and AI — no fluff.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: easeOut }}
              className="body-lg max-w-xl"
            >
              From AI contract analyzers and e-commerce marketplaces to
              offline-first mobile POS systems — I build production apps across
              web, mobile, and AI with React, Go, Python, and cloud infrastructure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: easeOut }}
              className="flex flex-wrap gap-3"
            >
              <Button variant="ghost" href="#projects">Explore Work</Button>
              <Button variant="filled" href="/Ken_Zamariyan_FullStack_Developer.pdf" download target="_blank" rel="noopener noreferrer">
                <Download size={16} />
                Download CV
              </Button>
            </motion.div>
          </div>
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: easeOut }}
            >
              <div className="relative h-[200px] w-[200px] lg:h-[260px] lg:w-[260px] overflow-hidden rounded-full bg-canvas-card border-[3px] border-white dark:border-black">
                <Image src="/image/profile/profile-image.jpeg" alt="Ken Zamariyan" fill priority
                  sizes="(max-width: 1024px) 200px, 260px" className="object-cover object-[center_60%]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
