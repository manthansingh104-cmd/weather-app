import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

import type { WeatherData } from "../types/weather";
import {
  convertTemp,
  convertWind,
  type TempUnit,
  type WindUnit,
} from "../utils/convert";


interface WeatherCardProps {
  weather: WeatherData;
  tempUnit: TempUnit;
  windUnit: WindUnit;
}


function WeatherCard({
  weather,
  tempUnit,
  windUnit,
}: WeatherCardProps) {


  const iconUrl =
    `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;


  const cardRef = useRef<HTMLDivElement>(null);


  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


  const rotateX = useSpring(
    useTransform(mouseY, [-100,100],[8,-8]),
    {
      stiffness:150,
      damping:15
    }
  );


  const rotateY = useSpring(
    useTransform(mouseX, [-100,100],[-8,8]),
    {
      stiffness:150,
      damping:15
    }
  );



  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    // disable tilt on touch devices
    if(window.innerWidth < 768) return;


    const card = cardRef.current;

    if(!card) return;


    const rect =
      card.getBoundingClientRect();


    mouseX.set(
      e.clientX - rect.left - rect.width / 2
    );


    mouseY.set(
      e.clientY - rect.top - rect.height / 2
    );

  };



  const handleMouseLeave = ()=>{

    mouseX.set(0);
    mouseY.set(0);

  };




  return (

    <motion.div

      ref={cardRef}

      onMouseMove={handleMouseMove}

      onMouseLeave={handleMouseLeave}

      style={{
        rotateX,
        rotateY,
        transformPerspective:800
      }}

      className="
      w-full
      max-w-md
      mx-auto

      bg-white/90
      backdrop-blur-md

      rounded-3xl

      shadow-2xl

      p-5
      sm:p-8

      border
      border-white/50

      text-center
      "

    >



      <div
        className="
        flex
        flex-col
        sm:flex-row

        justify-between
        items-center

        gap-3

        mb-4
        "
      >

        <span
          className="
          text-xs
          font-semibold
          uppercase
          tracking-wide

          bg-blue-100
          text-blue-700

          px-3
          py-1

          rounded-full
          "
        >

          {
            new Date()
            .toLocaleDateString(
              "en-US",
              {
                weekday:"long"
              }
            )
          }

        </span>



        <h2
          className="
          text-base
          sm:text-lg

          font-semibold

          text-gray-700

          break-words
          "
        >

          {weather.city}, {weather.country}

        </h2>


      </div>





      <img

        src={iconUrl}

        alt={weather.condition}

        className="
        mx-auto

        w-28
        sm:w-40

        h-28
        sm:h-40

        object-contain

        drop-shadow-xl

        "
      />





      <p

        className="
        text-4xl
        sm:text-6xl

        font-extrabold

        text-gray-900

        mt-2

        "

      >

        {convertTemp(
          weather.temperature,
          tempUnit
        )}

        °{tempUnit}

      </p>





      <p

        className="
        text-base
        sm:text-lg

        text-gray-500

        capitalize

        mt-2

        "

      >

        {weather.condition}

      </p>






      <div

        className="
        grid
        grid-cols-2

        gap-4

        mt-6

        pt-4

        border-t

        border-gray-200

        text-gray-700

        "

      >


        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-wide
            text-gray-400
            "
          >
            Humidity
          </p>


          <p
            className="
            font-semibold
            text-lg
            "
          >

            {weather.humidity}%

          </p>

        </div>




        <div>

          <p
            className="
            text-xs
            uppercase
            tracking-wide
            text-gray-400
            "
          >
            Wind
          </p>


          <p
            className="
            font-semibold
            text-lg
            break-words
            "
          >

            {convertWind(
              weather.windSpeed,
              windUnit
            )}

          </p>


        </div>



      </div>



    </motion.div>

  );

}


export default WeatherCard;