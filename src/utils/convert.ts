export type TempUnit = "C" | "F";
export type WindUnit = "ms" | "kmh" | "mph";

export function convertTemp(celsius: number, unit: TempUnit): number {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function convertWind(metersPerSecond: number, unit: WindUnit): string {
  if (unit === "kmh") {
    return `${(metersPerSecond * 3.6).toFixed(1)} km/h`;
  }
  if (unit === "mph") {
    return `${(metersPerSecond * 2.237).toFixed(1)} mph`;
  }
  return `${metersPerSecond.toFixed(1)} m/s`;
}