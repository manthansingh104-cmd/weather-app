import { motion } from "framer-motion";
import type { HourlyForecast } from "../types/weather";
import { convertTemp, type TempUnit } from "../utils/convert";


interface HourlyForecastListProps {
  hourly: HourlyForecast[];
  tempUnit: TempUnit;
}



function HourlyForecastList({
  hourly,
  tempUnit,
}: HourlyForecastListProps) {


  return (

    <div

      className="
      w-full

      max-w-2xl

      overflow-x-auto

      scrollbar-thin

      "

    >

      <div

        className="
        flex

        gap-3

        pb-3

        px-1

        "

      >


        {hourly.map((hour,index)=>{


          const iconUrl =
            `https://openweathermap.org/img/wn/${hour.icon}@2x.png`;


          const label =
            new Date(hour.time)
            .toLocaleTimeString(
              "en-US",
              {
                hour:"numeric"
              }
            );



          return (

            <motion.div


              key={hour.time}


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
                delay:index*0.05
              }}



              className="

              flex-shrink-0

              w-[76px]
              sm:w-[85px]

              bg-white/80

              backdrop-blur-md

              rounded-xl

              shadow

              p-3

              border
              border-white/40

              flex
              flex-col
              items-center

              gap-1

              "

            >



              <p

                className="
                text-xs
                font-medium
                text-gray-600
                "

              >

                {label}

              </p>




              <img

                src={iconUrl}

                alt={hour.condition}

                className="
                w-9
                h-9
                object-contain
                "

              />




              <p

                className="
                text-sm
                font-bold
                text-gray-900
                "

              >

                {convertTemp(
                  hour.temperature,
                  tempUnit
                )}
                °

              </p>




              <p

                className="
                text-xs
                text-blue-500
                "

              >

                {hour.chanceOfRain}%

              </p>



            </motion.div>

          );

        })}


      </div>


    </div>

  );

}


export default HourlyForecastList;