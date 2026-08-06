import { motion } from "framer-motion";
import type { WeatherData } from "../types/weather";
import { convertTemp, convertWind, type TempUnit, type WindUnit } from "../utils/convert";

interface DetailsGridProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  windUnit: WindUnit;
}

interface DetailItem {
  label: string;
  value: string;
}

function DetailsGrid({ weather, tempUnit, windUnit }: DetailsGridProps) {
const items: DetailItem[] = [
   
    { label: "Feels Like", value: `${convertTemp(weather.feelsLike, tempUnit)}°${tempUnit}` },
    { label: "Humidity", value: `${weather.humidity}%` },
    { label: "Wind", value: convertWind(weather.windSpeed, windUnit) },
    { label: "Pressure", value: `${weather.pressure} hPa` },
    { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km` },
    { label: "Clouds", value: `${weather.clouds}%` },
    { label: "UV Index", value: weather.uvIndex !== null ? `${weather.uvIndex}` : "N/A" },
    
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-md rounded-xl shadow p-4 border border-white/40"
        >
          <p className="text-xs uppercase tracking-wide text-gray-400">
            {item.label}
          </p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default DetailsGrid;