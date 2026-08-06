import { motion } from "framer-motion";

interface SunArcProps {
  sunrise: number;
  sunset: number;
  timezone: number;
}

function formatTime(unixSeconds: number, timezoneOffsetSeconds: number): string {
  const localMillis = (unixSeconds + timezoneOffsetSeconds) * 1000;
  const date = new Date(localMillis);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function SunArc({ sunrise, sunset, timezone }: SunArcProps) {
  const now = Date.now() / 1000;
  const dayLength = sunset - sunrise;

  let progress = (now - sunrise) / dayLength;
  progress = Math.min(Math.max(progress, 0), 1);

  const isDaytime = now >= sunrise && now <= sunset;

  const hours = Math.floor(dayLength / 3600);
  const minutes = Math.floor((dayLength % 3600) / 60);

  const angle = progress * 180;
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const sunX = cx - radius * Math.cos((angle * Math.PI) / 180);
  const sunY = cy - radius * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-md border border-white/40 text-center">
      <p className="text-sm font-medium text-gray-500 mb-2">
        Day length: {hours}h {minutes}m
      </p>

      <svg viewBox="0 0 200 110" className="w-full h-28">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />

        {isDaytime && (
          <>
            <motion.circle
              cx={sunX}
              cy={sunY}
              r="14"
              fill="#fbbf24"
              opacity={0.35}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ duration: 0.6 }}
              style={{ filter: "blur(4px)" }}
            />
            <motion.circle
              cx={sunX}
              cy={sunY}
              r="8"
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth="2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            />
          </>
        )}

        <circle cx={20} cy={100} r="3" fill="#9ca3af" />
        <circle cx={180} cy={100} r="3" fill="#9ca3af" />
      </svg>

      <div className="flex justify-between mt-1 text-sm text-gray-700">
        <div>
          <p className="text-xs text-gray-400 uppercase">Sunrise</p>
          <p className="font-semibold">{formatTime(sunrise, timezone)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Sunset</p>
          <p className="font-semibold">{formatTime(sunset, timezone)}</p>
        </div>
      </div>
    </div>
  );
}

export default SunArc;