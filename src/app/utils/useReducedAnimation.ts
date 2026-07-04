"use client";

import { useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  easeOut,
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  seqHeader,
  seqLabel,
  seqTitle,
  seqDesc,
  seqContent,
  scaleRotateIn,
  clipRevealUp,
  flipCard,
} from "./animations";

export function useReducedVariants() {
  const reduced = useReducedMotion();

  if (!reduced) {
    return {
      fadeUp,
      fadeIn,
      slideLeft,
      slideRight,
      scaleIn,
      staggerContainer,
      staggerItem,
      seqHeader,
      seqLabel,
      seqTitle,
      seqDesc,
      seqContent,
      scaleRotateIn,
      clipRevealUp,
      flipCard,
    };
  }

  const instant: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  const instantContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0, delayChildren: 0 },
    },
  };

  const instantItem: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  return {
    fadeUp: instant,
    fadeIn,
    slideLeft: instant,
    slideRight: instant,
    scaleIn: instant,
    staggerContainer: instantContainer,
    staggerItem: instantItem,
    seqHeader: { hidden: {}, visible: { transition: { staggerChildren: 0 } } },
    seqLabel: instant,
    seqTitle: instant,
    seqDesc: instant,
    seqContent: instant,
    scaleRotateIn: instant,
    clipRevealUp: instant,
    flipCard: instant,
  };
}
