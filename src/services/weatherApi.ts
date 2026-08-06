
import type { WeatherData, ForecastDay, HourlyForecast, AirQuality } from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Check the spelling and try again.");
    }
    throw new Error("Something went wrong fetching the weather.");
  }

  const data = await response.json();

 const weather: WeatherData = {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    timezone: data.timezone,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    visibility: data.visibility,
    clouds: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
    uvIndex: null,
  };

  return weather;
}

export async function fetchForecast(city: string): Promise<ForecastDay[]> {
  const response = await fetch(
    `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Could not fetch forecast data.");
  }

  const data = await response.json();

  const dailyMap = new Map<string, any>();

  for (const entry of data.list) {
    const date = entry.dt_txt.split(" ")[0];
    const hour = entry.dt_txt.split(" ")[1];

    if (hour === "12:00:00" && !dailyMap.has(date)) {
      dailyMap.set(date, entry);
    }
  }

  const forecast: ForecastDay[] = Array.from(dailyMap.values())
    .slice(0, 5)
    .map((entry) => ({
      date: entry.dt_txt.split(" ")[0],
      temperature: Math.round(entry.main.temp),
      condition: entry.weather[0].main,
      icon: entry.weather[0].icon,
    }));

  return forecast;
}

export async function fetchHourlyForecast(city: string): Promise<HourlyForecast[]> {
  const response = await fetch(
    `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Could not fetch hourly forecast.");
  }

  const data = await response.json();

  const hourly: HourlyForecast[] = data.list.slice(0, 8).map((entry: any) => ({
    time: entry.dt_txt,
    temperature: Math.round(entry.main.temp),
    condition: entry.weather[0].main,
    icon: entry.weather[0].icon,
    chanceOfRain: Math.round((entry.pop ?? 0) * 100),
  }));

  return hourly;
}
export async function fetchUvIndex(lat: number, lon: number): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index&timezone=auto`
    );

    if (!response.ok) return null;

    const data = await response.json();

    const times: string[] = data.hourly.time;
    const uvValues: number[] = data.hourly.uv_index;

    const now = new Date();
    const currentHourIso = now.toISOString().slice(0, 13);

    const index = times.findIndex((t) => t.startsWith(currentHourIso));

    if (index === -1) return null;
    return Math.round(uvValues[index] * 10) / 10;
  } catch {
    return null;
  }
}
export async function fetchAirQuality(lat: number, lon: number): Promise<AirQuality | null> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const entry = data.list[0];

    return {
      aqi: entry.main.aqi,
      pm2_5: entry.components.pm2_5,
      pm10: entry.components.pm10,
      co: entry.components.co,
      no2: entry.components.no2,
      so2: entry.components.so2,
      o3: entry.components.o3,
    };
  } catch {
    return null;
  }
}
export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Could not fetch weather for your location.");
  }

  const data = await response.json();

  const weather: WeatherData = {
    city: data.name,
    country: data.sys.country,
    lat: data.coord.lat,
    lon: data.coord.lon,
    timezone: data.timezone,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDeg: data.wind.deg,
    visibility: data.visibility,
    clouds: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    condition: data.weather[0].main,
    icon: data.weather[0].icon,
    uvIndex: null,
  };

  return weather;
}

export async function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastDay[]> {
  const response = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Could not fetch forecast for your location.");
  }

  const data = await response.json();

  const dailyMap = new Map<string, any>();
  for (const entry of data.list) {
    const date = entry.dt_txt.split(" ")[0];
    const hour = entry.dt_txt.split(" ")[1];
    if (hour === "12:00:00" && !dailyMap.has(date)) {
      dailyMap.set(date, entry);
    }
  }

  return Array.from(dailyMap.values())
    .slice(0, 5)
    .map((entry) => ({
      date: entry.dt_txt.split(" ")[0],
      temperature: Math.round(entry.main.temp),
      condition: entry.weather[0].main,
      icon: entry.weather[0].icon,
    }));
}

export async function fetchHourlyForecastByCoords(lat: number, lon: number): Promise<HourlyForecast[]> {
  const response = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Could not fetch hourly forecast for your location.");
  }

  const data = await response.json();

  return data.list.slice(0, 8).map((entry: any) => ({
    time: entry.dt_txt,
    temperature: Math.round(entry.main.temp),
    condition: entry.weather[0].main,
    icon: entry.weather[0].icon,
    chanceOfRain: Math.round((entry.pop ?? 0) * 100),
  }));
}