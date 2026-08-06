import { motion } from "framer-motion";
import type { ForecastDay } from "../types/weather";
import { convertTemp, type TempUnit } from "../utils/convert";


interface ForecastListProps {
  forecast: ForecastDay[];
  tempUnit: TempUnit;
}


function ForecastList({
  forecast,
  tempUnit,
}: ForecastListProps) {


  return (

    <div

      className="
      w-full
      max-w-2xl

      grid

      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-5

      gap-3

      "

    >

      {forecast.map((day,index)=>{


        const iconUrl =
          `https://openweathermap.org/img/wn/${day.icon}@2x.png`;


        const dayLabel =
          new Date(day.date)
          .toLocaleDateString(
            "en-US",
            {
              weekday:"short"
            }
          );



        return (

          <motion.div


            key={day.date}


            initial={{
              opacity:0,
              y:20
            }}


            animate={{
              opacity:1,
              y:0
            }}


            transition={{
              duration:0.4,
              delay:index*0.1
            }}


            whileHover={{
              y:-6,
              scale:1.05
            }}



            className="

            bg-white/80

            backdrop-blur-md

            rounded-2xl

            shadow-lg

            p-3

            flex

            flex-col

            items-center

            justify-center

            border

            border-white/40

            min-w-0

            "

          >



            <p

              className="
              text-xs
              sm:text-sm

              font-medium

              text-gray-600
              "

            >

              {dayLabel}

            </p>




            <img

              src={iconUrl}

              alt={day.condition}

              className="
              w-10
              h-10

              sm:w-12
              sm:h-12

              object-contain

              "

            />




            <p

              className="
              text-sm
              sm:text-lg

              font-bold

              text-gray-900

              text-center

              "

            >

              {convertTemp(
                day.temperature,
                tempUnit
              )}
              °{tempUnit}

            </p>



          </motion.div>

        );

      })}


    </div>

  );

}


export default ForecastList;