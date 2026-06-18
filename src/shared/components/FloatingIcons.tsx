import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingIcon {
  id: string;
  icon: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
  opacity: number;
}

const FLOATING_ICONS: FloatingIcon[] = [
  {
    id: "1",
    icon: "💼",
    x: 10,
    y: 20,
    duration: 20,
    delay: 0,
    size: 40,
    opacity: 0.1,
  },
  {
    id: "2",
    icon: "🚀",
    x: 80,
    y: 60,
    duration: 25,
    delay: 2,
    size: 48,
    opacity: 0.08,
  },
  {
    id: "3",
    icon: "⚡",
    x: 15,
    y: 70,
    duration: 22,
    delay: 1,
    size: 36,
    opacity: 0.1,
  },
  {
    id: "4",
    icon: "✨",
    x: 85,
    y: 25,
    duration: 28,
    delay: 3,
    size: 44,
    opacity: 0.08,
  },
  {
    id: "5",
    icon: "🎯",
    x: 45,
    y: 80,
    duration: 26,
    delay: 1.5,
    size: 40,
    opacity: 0.09,
  },
];

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Initialize with media query result
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function FloatingIcons() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {FLOATING_ICONS.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-center select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            opacity: item.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div style={{ fontSize: `${item.size}px` }}>{item.icon}</div>
        </motion.div>
      ))}
    </div>
  );
}
