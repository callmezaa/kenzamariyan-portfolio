import type { Variants, Transition } from "framer-motion";

export const appleSpring: Transition = {
  type: "spring",
  stiffness: 250,
  damping: 25,
  mass: 0.8,
};

export const appleSpringSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
};

export const appleSpringGentle: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 22,
};

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUpSpring: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: appleSpring },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpringGentle,
  },
};
