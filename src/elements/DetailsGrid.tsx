import { motion } from "framer-motion";
import type { WeatherData } from "../types/weather";
import {
  convertTemp,
  convertWind,
  type TempUnit,
  type WindUnit,
} from "../utils/convert";


interface DetailsGridProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  windUnit: WindUnit;
}


interface DetailItem {
  label: string;
  value: string;
}



function DetailsGrid({
  weather,
  tempUnit,
  windUnit,
}: DetailsGridProps) {


  const items: DetailItem[] = [

    {
      label: "Feels Like",
      value:
        `${convertTemp(weather.feelsLike,tempUnit)}°${tempUnit}`
    },

    {
      label: "Humidity",
      value:
        `${weather.humidity}%`
    },

    {
      label: "Wind",
      value:
        convertWind(weather.windSpeed,windUnit)
    },

    {
      label: "Pressure",
      value:
        `${weather.pressure} hPa`
    },

    {
      label: "Visibility",
      value:
        `${(weather.visibility / 1000).toFixed(1)} km`
    },

    {
      label: "Clouds",
      value:
        `${weather.clouds}%`
    },

    {
      label: "UV Index",
      value:
        weather.uvIndex !== null
        ? `${weather.uvIndex}`
        : "N/A"
    },

  ];



  return (

    <div

      className="
      w-full

      grid

      grid-cols-1
      xs:grid-cols-2
      md:grid-cols-3

      gap-3

      "

    >

      {items.map((item,index)=>(


        <motion.div

          key={item.label}


          initial={{
            opacity:0,
            y:15
          }}


          animate={{
            opacity:1,
            y:0
          }}


          transition={{
            duration:0.4,
            delay:index * 0.05,
            ease:"easeOut"
          }}


          className="

          bg-white/80

          backdrop-blur-md

          rounded-xl

          shadow

          p-3
          sm:p-4

          border
          border-white/40

          min-w-0

          "

        >


          <p

            className="
            text-[10px]
            sm:text-xs

            uppercase

            tracking-wide

            text-gray-400

            truncate

            "

          >

            {item.label}

          </p>



          <p

            className="
            text-base
            sm:text-lg

            font-semibold

            text-gray-900

            mt-1

            break-words

            "

          >

            {item.value}

          </p>



        </motion.div>


      ))}


    </div>

  );

}


export default DetailsGrid;