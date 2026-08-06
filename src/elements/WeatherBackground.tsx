import { motion } from "framer-motion";

interface WeatherBackgroundProps {
  condition: string | null;
  icon: string | null;
}

/**
 * SunOrb — the core "distant light source" effect.
 * Positioned partially off-screen (top/right pushed past the viewport edge)
 * so only ~60-70% of it is ever visible, making it read as a distant sun
 * rather than a sticker sitting on the page.
 */
function SunOrb({
  warm = true,
  hidden = false,
}: {
  warm?: boolean;
  hidden?: boolean;
}) {
  const glowColor = warm ? "#FFB300" : "#93C5FD";
  const coreColor = warm ? "#FFD54F" : "#E0F2FE";
  const rayColor = warm ? "#FFECB3" : "#DBEAFE";

  return (
    <div
      className="absolute pointer-events-none -z-10"
      style={{
        top: "-90px",
        right: "-100px",
        width: "280px",
        height: "280px",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            inset: "-60px",
            opacity: hidden ? 0.08 : 0.28,
            background: `radial-gradient(circle, ${glowColor}88, transparent 70%)`,
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${coreColor}, transparent 65%)`,
          }}
          animate={{
            opacity: hidden ? [0.05, 0.1, 0.05] : [0.22, 0.34, 0.22],
            scale: [1, 1.05, 1],
          }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />

        {!hidden && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 75, ease: "linear" }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: "2px",
                  height: "70px",
                  backgroundColor: rayColor,
                  opacity: 0.18,
                  filter: "blur(1px)",
                  transform: `rotate(${i * 30}deg) translateY(-100px)`,
                }}
              />
            ))}
          </motion.div>
        )}

        <div
          className="absolute rounded-full"
          style={{
            inset: "70px",
            opacity: hidden ? 0.15 : 0.35,
            filter: "blur(6px)",
            background: warm
              ? "radial-gradient(circle at 35% 30%, #FFD54F, #FFB300 60%, transparent 100%)"
              : "radial-gradient(circle at 35% 30%, #E0F2FE, #93C5FD 60%, transparent 100%)",
          }}
        />

        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 2,
              height: 2,
              top: `${30 + Math.random() * 40}%`,
              left: `${30 + Math.random() * 40}%`,
            }}
            animate={{ y: [0, -14, 0], opacity: [0, 0.35, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5 + Math.random() * 3,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** MoonOrb — night version: cooler tones, no rays, paired with twinkling stars */
function MoonOrb() {
  return (
    <div
      className="absolute pointer-events-none -z-10"
      style={{ top: "-90px", right: "-100px", width: "260px", height: "260px" }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      >
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            inset: "-50px",
            opacity: 0.22,
            background: "radial-gradient(circle, #C4B5FD88, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: "radial-gradient(circle, #E0E7FF, transparent 65%)",
          }}
          animate={{ opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: "65px",
            opacity: 0.3,
            filter: "blur(4px)",
            background:
              "radial-gradient(circle at 35% 30%, #F5F3FF, #C4B5FD 60%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}

/** DustHaze — shared visual for dust/sand/smoke/ash: warm hazy horizontal bands, no sun rays */
function DustHaze({ tint = "#D8C08F" }: { tint?: string }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute blur-2xl"
          style={{
            width: "150%",
            height: "90px",
            top: `${15 + i * 20}%`,
            left: "-25%",
            background: `linear-gradient(90deg, transparent, ${tint}33, transparent)`,
          }}
          animate={{ x: ["0%", "12%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 18 + i * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function WeatherBackground({ condition, icon }: WeatherBackgroundProps) {
  if (!condition) return null;

  const lower = condition.toLowerCase();
  const isNight = icon?.endsWith("n") ?? false;

  // ===== NIGHT: moon + twinkling stars =====
  if (isNight) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <MoonOrb />
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== THUNDERSTORM / SQUALL / TORNADO: no sun, lightning + heavier/angled rain =====
  if (lower.includes("thunder") || lower.includes("squall") || lower.includes("tornado")) {
    const isTornado = lower.includes("tornado");
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {Array.from({ length: isTornado ? 35 : 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-6 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              rotate: isTornado ? "15deg" : "0deg",
            }}
            initial={{ y: -50 }}
            animate={{ y: "110vh" }}
            transition={{
              repeat: Infinity,
              duration: isTornado ? 0.5 + Math.random() * 0.3 : 0.7 + Math.random() * 0.5,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{ opacity: [0, 0, 0.15, 0, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            times: [0, 0.7, 0.72, 0.75, 1],
            ease: "easeOut",
          }}
        />
      </div>
    );
  }

  // ===== RAIN: sun hidden, only a faint glow shows through =====
  if (lower.includes("rain")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb hidden />
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-6 bg-white/35 rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: -50 }}
            animate={{ y: "110vh" }}
            transition={{
              repeat: Infinity,
              duration: 0.8 + Math.random() * 0.6,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== DRIZZLE: same idea as rain, but lighter/thinner/slower drops =====
  if (lower.includes("drizzle")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb hidden />
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-4 bg-white/25 rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
            initial={{ y: -30 }}
            animate={{ y: "110vh" }}
            transition={{
              repeat: Infinity,
              duration: 1.4 + Math.random() * 0.8,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== SNOW: cold sun with icy glow =====
  if (lower.includes("snow")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb warm={false} />
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              width: 3 + Math.random() * 3,
              height: 3 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -30 }}
            animate={{ y: "110vh", x: [0, 15, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 6 + Math.random() * 4,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== MIST / FOG / HAZE =====
  if (lower.includes("mist") || lower.includes("fog") || lower.includes("haze")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb hidden />
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/15 blur-2xl"
            style={{
              width: "140%",
              height: "80px",
              top: `${25 + i * 22}%`,
              left: "-20%",
            }}
            animate={{ x: ["0%", "10%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 20 + i * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== DUST / SAND / SMOKE / ASH: hazy bands, sun dimmed, no rays =====
  if (
    lower.includes("dust") ||
    lower.includes("sand") ||
    lower.includes("smoke") ||
    lower.includes("ash")
  ) {
    const tint = lower.includes("smoke") || lower.includes("ash") ? "#9CA3AF" : "#D8C08F";
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb hidden />
        <DustHaze tint={tint} />
      </div>
    );
  }

  // ===== CLOUDS: sun partly hidden behind drifting clouds =====
  if (lower.includes("cloud")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb hidden />
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 rounded-full blur-2xl"
            style={{
              width: `${150 + i * 40}px`,
              height: `${80 + i * 20}px`,
              top: `${10 + i * 15}%`,
            }}
            initial={{ x: "-20vw" }}
            animate={{ x: "120vw" }}
            transition={{
              repeat: Infinity,
              duration: 30 + i * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  }

  // ===== CLEAR: elegant golden sun =====
  if (lower.includes("clear")) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <SunOrb />
      </div>
    );
  }

  // ===== DEFAULT FALLBACK: unrecognized condition string still gets a soft
  // dimmed sun instead of rendering nothing at all =====
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <SunOrb hidden />
    </div>
  );
}

export default WeatherBackground;