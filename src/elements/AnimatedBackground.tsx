import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BLOBS = [
  { color: "#38BDF8", size: 900, top: "-15%", left: "-10%", duration: 28 },
  { color: "#7C3AED", size: 850, top: "10%", left: "55%", duration: 34 },
  { color: "#2563EB", size: 800, top: "50%", left: "-5%", duration: 30 },
  { color: "#4F46E5", size: 750, top: "55%", left: "50%", duration: 26 },
];

const PARTICLE_COUNT = 16;

function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 50,
    damping: 20,
  });
  const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 2 + Math.random() * 2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20 bg-[#0a1229]">
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 mix-blend-screen"
      >
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: blob.size,
              height: blob.size,
              top: blob.top,
              left: blob.left,
              backgroundColor: blob.color,
              opacity: 0.55,
              filter: "blur(140px)",
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 35, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: blob.duration,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Soft center glow to lift the mid-area where the card sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 55%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -600],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: p.duration,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;