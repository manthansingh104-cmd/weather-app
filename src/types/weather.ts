export interface WeatherData {
  city: string;
  country: string;
  lat: number;
  lon: number;
  timezone: number;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDeg: number;
  visibility: number;
  clouds: number;
  sunrise: number;
  sunset: number;
  condition: string;
  icon: string;
  uvIndex: number | null;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}
export interface HourlyForecast {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
  chanceOfRain: number;
}
export interface AirQuality {
  aqi: number;
  pm2_5: number;
  pm10: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
}