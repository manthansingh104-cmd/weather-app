import type { TempUnit, WindUnit } from "../utils/convert";

interface UnitToggleProps {
  tempUnit: TempUnit;
  windUnit: WindUnit;
  onTempUnitChange: (unit: TempUnit) => void;
  onWindUnitChange: (unit: WindUnit) => void;
}

function UnitToggle({
  tempUnit,
  windUnit,
  onTempUnitChange,
  onWindUnitChange,
}: UnitToggleProps) {
  return (
    <div className="flex gap-4 items-center justify-center text-sm">
      <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1">
        {(["C", "F"] as TempUnit[]).map((unit) => (
          <button
            key={unit}
            onClick={() => onTempUnitChange(unit)}
            className={`px-3 py-1 rounded-full transition ${
              tempUnit === unit
                ? "bg-white text-gray-900 font-semibold"
                : "text-white/80"
            }`}
          >
            °{unit}
          </button>
        ))}
      </div>

      <div className="flex bg-white/20 backdrop-blur-md rounded-full p-1">
        {(["ms", "kmh", "mph"] as WindUnit[]).map((unit) => (
          <button
            key={unit}
            onClick={() => onWindUnitChange(unit)}
            className={`px-3 py-1 rounded-full transition ${
              windUnit === unit
                ? "bg-white text-gray-900 font-semibold"
                : "text-white/80"
            }`}
          >
            {unit === "ms" ? "m/s" : unit === "kmh" ? "km/h" : "mph"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default UnitToggle;