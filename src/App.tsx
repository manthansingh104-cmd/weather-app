import { useState } from "react";
import { motion } from "framer-motion";
import WeatherBackground from "./elements/WeatherBackground";
import AnimatedBackground from "./elements/AnimatedBackground";
import SearchBar from "./elements/SearchBar";
import WeatherCard from "./elements/WeatherCard";
import ForecastList from "./elements/ForecastList";
import Loader from "./elements/Loader";
import DetailsGrid from "./elements/DetailsGrid";
import SunArc from "./elements/SunArc";
import HourlyForecastList from "./elements/HourlyForecastList";
import AirQualitySection from "./elements/AirQualitySection";
import UnitToggle from "./elements/UnitToggle";
import { fetchWeather, fetchForecast, fetchHourlyForecast, fetchUvIndex, fetchAirQuality } from "./services/weatherApi";
import type { WeatherData, ForecastDay, HourlyForecast, AirQuality } from "./types/weather";
import { type TempUnit, type WindUnit } from "./utils/convert";
import RecentSearches from "./elements/RecentSearches";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getCurrentLocation } from "./hooks/useGeolocation";
import { fetchWeatherByCoords, fetchForecastByCoords, fetchHourlyForecastByCoords } from "./services/weatherApi";
import OfflineBanner from "./elements/OfflineBanner";
import InstallPrompt from "./elements/InstallPrompt";
<>
    <OfflineBanner />
    <InstallPrompt />

    {/* your current weather app */}
</>
function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [tempUnit, setTempUnit] = useState<TempUnit>("C");
  const [windUnit, setWindUnit] = useState<WindUnit>("ms");
  const [recent, setRecent] = useLocalStorage<string[]>("recentSearches", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favoriteCities", []);

  const addToRecent = (city: string) => {
    setRecent((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, 6);
    });
  };

  const toggleFavorite = (city: string) => {
    setFavorites((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };
  const handleSearch = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);
    setHourly([]);
    setAirQuality(null);

    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
        fetchHourlyForecast(city),
      ]);

      const [uvIndex, airQualityData] = await Promise.all([
        fetchUvIndex(weatherData.lat, weatherData.lon),
        fetchAirQuality(weatherData.lat, weatherData.lon),
      ]);

      setWeather({ ...weatherData, uvIndex });
      addToRecent(weatherData.city);
      setForecast(forecastData);
      setHourly(hourlyData);
      setAirQuality(airQualityData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };
const handleUseLocation = async () => {
    setIsLoading(true);
    setError(null);
    setWeather(null);
    setForecast([]);
    setHourly([]);
    setAirQuality(null);

    try {
      const { lat, lon } = await getCurrentLocation();

      const [weatherData, forecastData, hourlyData] = await Promise.all([
        fetchWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
        fetchHourlyForecastByCoords(lat, lon),
      ]);

      const [uvIndex, airQualityData] = await Promise.all([
        fetchUvIndex(lat, lon),
        fetchAirQuality(lat, lon),
      ]);

      setWeather({ ...weatherData, uvIndex });
      addToRecent(weatherData.city);
      setForecast(forecastData);
      setHourly(hourlyData);
      setAirQuality(airQualityData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center py-16 px-4 gap-8 overflow-hidden relative">
      <AnimatedBackground />

      <WeatherBackground condition={weather?.condition ?? null} icon={weather?.icon ?? null} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md tracking-tight">
          Real-Time{" "}
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-300 bg-clip-text text-transparent">
            Weather
          </span>{" "}
          Insights
        </h1>
        <p className="mt-3 text-gray-300 text-sm md:text-base">
          Search any city for live conditions and a 5-day forecast, wrapped
          in a calm, modern interface.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
       
        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} />
      </motion.div>

      <UnitToggle
        tempUnit={tempUnit}
        windUnit={windUnit}
        onTempUnitChange={setTempUnit}
        onWindUnitChange={setWindUnit}
      />
      <RecentSearches
        recent={recent}
        favorites={favorites}
        onSelect={handleSearch}
        onToggleFavorite={toggleFavorite}
      />

      {isLoading && <Loader />}

      {error && (
        <p className="text-red-700 bg-red-100/90 backdrop-blur px-4 py-2 rounded-lg shadow">
          {error}
        </p>
      )}

      {weather && !isLoading && (
        <div className="w-full max-w-2xl flex flex-col items-center gap-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <WeatherCard weather={weather} tempUnit={tempUnit} windUnit={windUnit} />
          </motion.div>

          {hourly.length > 0 && (
            <section className="w-full">
              <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3 text-center">
                Hourly Forecast
              </h2>
              <HourlyForecastList hourly={hourly} tempUnit={tempUnit} />
            </section>
          )}

          {forecast.length > 0 && (
            <section className="w-full">
              <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3 text-center">
                5-Day Forecast
              </h2>
              <ForecastList forecast={forecast} tempUnit={tempUnit} />
            </section>
          )}

          <section className="w-full">
            <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3 text-center">
              Weather Details
            </h2>
            <DetailsGrid weather={weather} tempUnit={tempUnit} windUnit={windUnit} />
          </section>

          {airQuality && (
            <section className="w-full flex justify-center">
              <div className="w-full">
                <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3 text-center">
                  Air Quality
                </h2>
                <AirQualitySection air={airQuality} />
              </div>
            </section>
          )}

          <section className="w-full flex justify-center">
            <div>
              <h2 className="text-white/80 text-sm font-semibold uppercase tracking-wide mb-3 text-center">
                Sun & Daylight
              </h2>
              <SunArc sunrise={weather.sunrise} sunset={weather.sunset} timezone={weather.timezone} />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;