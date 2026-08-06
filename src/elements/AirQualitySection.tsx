import { motion } from "framer-motion";
import type { AirQuality } from "../types/weather";

interface AirQualitySectionProps {
  air: AirQuality;
}

const AQI_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Good", color: "#22c55e" },
  2: { label: "Fair", color: "#84cc16" },
  3: { label: "Moderate", color: "#eab308" },
  4: { label: "Poor", color: "#f97316" },
  5: { label: "Very Poor", color: "#ef4444" },
};

function AirQualitySection({ air }: AirQualitySectionProps) {
  const info = AQI_LABELS[air.aqi] ?? AQI_LABELS[3];

  const pollutants = [
    { label: "PM2.5", value: air.pm2_5 },
    { label: "PM10", value: air.pm10 },
    { label: "CO", value: air.co },
    { label: "NO2", value: air.no2 },
    { label: "SO2", value: air.so2 },
    { label: "O3", value: air.o3 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-2xl border border-white/40">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Air Quality Index
          </p>
          <p className="text-2xl font-bold" style={{ color: info.color }}>
            {info.label}
          </p>
        </div>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
          style={{ backgroundColor: info.color }}
        >
          {air.aqi}
        </div>
      </div>

      {/* Color bar showing where this AQI sits */}
      <div className="flex h-2 rounded-full overflow-hidden mb-2">
        {Object.values(AQI_LABELS).map((level) => (
          <div
            key={level.label}
            className="flex-1"
            style={{
              backgroundColor: level.color,
              opacity: level.label === info.label ? 1 : 0.3,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mb-6">
        <span>Good</span>
        <span>Fair</span>
        <span>Moderate</span>
        <span>Poor</span>
        <span>Very Poor</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {pollutants.map((p, index) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/60 rounded-xl p-3 text-center"
          >
            <p className="text-xs text-gray-400 uppercase">{p.label}</p>
            <p className="text-sm font-semibold text-gray-800">
              {p.value.toFixed(1)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AirQualitySection;