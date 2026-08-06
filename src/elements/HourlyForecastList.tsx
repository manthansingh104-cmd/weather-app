import { motion } from "framer-motion";
import type { HourlyForecast } from "../types/weather";
import { convertTemp, type TempUnit } from "../utils/convert";

interface HourlyForecastListProps {
  hourly: HourlyForecast[];
  tempUnit: TempUnit;
}

function HourlyForecastList({ hourly, tempUnit }: HourlyForecastListProps) {
  return (
    <div className="w-full max-w-2xl overflow-x-auto">
      <div className="flex gap-3 pb-2">
        {hourly.map((hour, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${hour.icon}@2x.png`;
          const label = new Date(hour.time).toLocaleTimeString("en-US", {
            hour: "numeric",
          });

          return (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow p-3 flex flex-col items-center min-w-[70px] border border-white/40"
            >
              <p className="text-xs font-medium text-gray-600">{label}</p>
              <img src={iconUrl} alt={hour.condition} className="w-8 h-8" />
              <p className="text-sm font-bold text-gray-900">
                {convertTemp(hour.temperature, tempUnit)}°
              </p>
              <p className="text-xs text-blue-500">{hour.chanceOfRain}%</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecastList;