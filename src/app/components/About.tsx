"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils/reducedMotion";

interface GlowWordProps {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

function GlowWord({ word, progress, start, end }: GlowWordProps) {
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const color = useTransform(progress, [start, end], ["rgb(113, 113, 122)", "rgb(244, 244, 245)"]);

  return (
    <motion.span style={{ opacity, color }} className="mr-1.5 inline-block">
      {word}
    </motion.span>
  );
}

function ScrollGlowParagraph({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 50%"],
  });
  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min((index + 1.5) / words.length, 1);
        return <GlowWord key={`${word}-${index}`} word={word} progress={scrollYProgress} start={start} end={end} />;
      })}
    </p>
  );
}

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Particle {
      x: number;
      y: number;
      z: number;
      ox: number;
      oy: number;
      oz: number;
      radius: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 46 }, (_, index) => {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;
      const radius = 96 + Math.random() * 18;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      return {
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        radius: 1.4 + Math.random() * 1.4,
        color: index % 3 === 0 ? "rgba(59, 130, 246, 0.45)" : "rgba(255, 255, 255, 0.22)",
      };
    });

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const cos = Math.cos(0.003);
    const sin = Math.sin(0.003);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 300;

      particles.sort((a, b) => b.z - a.z);
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i += 1) {
        const p1 = particles[i];
        const rx1 = p1.x * cos - p1.z * sin;
        const rz1 = p1.z * cos + p1.x * sin;
        p1.x = rx1;
        p1.z = rz1;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - centerX;
          const dy = mouseRef.current.y - centerY;
          const distToMouse = Math.hypot(p1.x - dx, p1.y - dy);

          if (distToMouse < 90) {
            const angle = Math.atan2(p1.y - dy, p1.x - dx);
            const force = (90 - distToMouse) * 0.06;
            p1.x += Math.cos(angle) * force;
            p1.y += Math.sin(angle) * force;
          }
        }

        p1.x += (p1.ox * cos - p1.oz * sin - p1.x) * 0.04;
        p1.y += (p1.oy - p1.y) * 0.04;
        p1.z += (p1.oz * cos + p1.ox * sin - p1.z) * 0.04;

        const scale1 = perspective / (perspective + p1.z);
        const x1 = centerX + p1.x * scale1;
        const y1 = centerY + p1.y * scale1;

        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const scale2 = perspective / (perspective + p2.z);
          const x2 = centerX + p2.x * scale2;
          const y2 = centerY + p2.y * scale2;
          const dist = Math.hypot(x1 - x2, y1 - y2);

          if (dist < 72) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - dist / 72) * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        const scale = perspective / (perspective + particle.z);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(centerX + particle.x * scale, centerY + particle.y * scale, particle.radius * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-950 to-black py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">About Me</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-zinc-100 md:text-4xl">
              Building reliable digital products with
              <span className="text-blue-400"> clarity</span> and
              <span className="text-blue-400"> purpose</span>
            </h2>
            <ScrollGlowParagraph
              text="I build practical web and mobile products across React, Next.js, React Native, Firebase, and data-driven operational workflows."
              className="max-w-xl text-lg font-medium leading-relaxed md:text-xl"
            />
            <ScrollGlowParagraph
              text="My strongest work sits at the intersection of clean interfaces, maintainable frontend architecture, and business workflows that non-technical users can operate confidently."
              className="max-w-xl text-sm leading-relaxed md:text-base"
            />
          </div>

          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 backdrop-blur-xl md:min-h-[400px] md:p-8"
          >
            <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-70 motion-reduce:hidden" />
            <div className="relative z-10 w-full space-y-4">
              {[
                {
                  title: "Architecture-Minded",
                  desc: "I keep component boundaries, data flow, and maintainability visible while building interfaces.",
                },
                {
                  title: "Product-Oriented",
                  desc: "I translate operational needs into screens, workflows, and interactions that reduce friction.",
                },
                {
                  title: "Web & Mobile Delivery",
                  desc: "I work across responsive web surfaces and React Native mobile experiences.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                  className="rounded-2xl border border-zinc-900 bg-zinc-950/45 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-zinc-800 hover:bg-zinc-950/75"
                >
                  <h3 className="mb-1 text-base font-bold text-zinc-200 transition group-hover:text-blue-400">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
