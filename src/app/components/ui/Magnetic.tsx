"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "../../utils/reducedMotion";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export default function Magnetic({ children, range = 50, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const { clientX, clientY } = e;
    const bounding = ref.current?.getBoundingClientRect();
    if (!bounding) return;

    const deltaX = (clientX - (bounding.left + bounding.width / 2)) * strength;
    const deltaY = (clientY - (bounding.top + bounding.height / 2)) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
