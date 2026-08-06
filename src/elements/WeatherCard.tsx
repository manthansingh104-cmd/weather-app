import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import type { WeatherData } from "../types/weather";
import { convertTemp, convertWind, type TempUnit, type WindUnit } from "../utils/convert";

interface WeatherCardProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  windUnit: WindUnit;
}

function WeatherCard({ weather, tempUnit, windUnit }: WeatherCardProps) {
const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-100, 100], [8, -8]),
    { stiffness: 150, damping: 15 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-100, 100], [-8, 8]),
    { stiffness: 150, damping: 15 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
   <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md text-center border border-white/50"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString("en-US", { weekday: "long" })}
        </span>
        <h2 className="text-lg font-semibold text-gray-700">
          {weather.city}, {weather.country}
        </h2>
      </div>

      <img
        src={iconUrl}
        alt={weather.condition}
        className="mx-auto w-40 h-40 object-contain drop-shadow-xl -mt-2"
      />

    
      <p className="text-6xl font-extrabold text-gray-900 -mt-2">
       {convertTemp(weather.temperature, tempUnit)}°{tempUnit}
     </p>
      <p className="text-lg text-gray-500 capitalize mt-1">
        {weather.condition}
      </p>

      <div className="flex justify-around mt-6 pt-4 border-t border-gray-200 text-gray-700">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Humidity
          </p>
          <p className="font-semibold text-lg">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Wind
          </p>
          <p className="font-semibold text-lg">{convertWind(weather.windSpeed, windUnit)}</p>
        </div>
      </div>
    </motion.div>
      );
}

export default WeatherCard;