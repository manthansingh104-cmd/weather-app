import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import VoiceSearchButton from "./VoiceSearchButton";
import { useVoiceRecognition } from "./useVoiceRecognition";
import { useClapActivation } from "./useClapActivation";


interface SearchBarProps {
  onSearch: (city:string)=>void;
  onUseLocation: ()=>void;
}



function SearchBar({
  onSearch,
  onUseLocation,
}:SearchBarProps) {


  const [city,setCity] = useState("");

  const [clapEnabled,setClapEnabled] =
    useState(false);



  const handleSubmit = (
    e:React.FormEvent
  )=>{

    e.preventDefault();

    if(!city.trim()) return;

    onSearch(city.trim());

    setCity("");

  };




  const handleVoiceResult =
    useCallback(
      (spokenCity:string)=>{

        setCity(spokenCity);

        onSearch(spokenCity);

        setCity("");

      },
      [onSearch]
    );




  const {
    isListening,
    isSupported,
    start,
    stop
  } =
  useVoiceRecognition(
    handleVoiceResult
  );





  const handleMicClick = ()=>{

    if(isListening)
      stop();
    else
      start();

  };





  const handleClap =
    useCallback(()=>{

      if(!isListening)
        start();

    },[
      isListening,
      start
    ]);




  useClapActivation(
    handleClap,
    clapEnabled
  );





  return (

    <div

      className="
      w-full
      max-w-md
      space-y-3

      "

    >


      <form

        onSubmit={handleSubmit}

        className="
        flex

        flex-col
        sm:flex-row

        gap-2

        w-full

        "

      >



        <motion.input

          type="text"

          value={city}

          onChange={
            e=>setCity(e.target.value)
          }

          placeholder="Enter city name..."

          whileFocus={{
            scale:1.02,
            boxShadow:
            "0 0 0 4px rgba(96,165,250,0.5)"
          }}

          transition={{
            type:"spring",
            stiffness:300,
            damping:20
          }}


          className="

          flex-1

          min-w-0

          px-4
          py-2

          rounded-lg

          border

          border-gray-300

          focus:outline-none

          bg-white/90

          "

        />





        <div

          className="
          flex

          gap-2

          "

        >



          <motion.button

            type="submit"

            whileTap={{
              scale:0.95
            }}

            className="

            flex-1

            px-4

            py-2

            bg-blue-500

            text-white

            rounded-lg

            hover:bg-blue-600

            "

          >

            Search

          </motion.button>





          <VoiceSearchButton

            isListening={isListening}

            isSupported={isSupported}

            onClick={handleMicClick}

          />





          <motion.button

            type="button"

            onClick={onUseLocation}

            whileTap={{
              scale:0.95
            }}

            className="

            px-3

            py-2

            bg-white/90

            text-gray-700

            rounded-lg

            hover:bg-white

            "

            title="Use my location"

          >

            📍

          </motion.button>



        </div>


      </form>






      {isSupported && (

        <motion.button

          type="button"

          onClick={()=>
            setClapEnabled(
              prev=>!prev
            )
          }

          whileTap={{
            scale:0.98
          }}


          className={`

          w-full

          text-xs

          px-3

          py-2

          rounded-full

          border

          transition-colors

          ${
            clapEnabled

            ? 
            "bg-yellow-400/90 text-gray-900 border-yellow-500"

            :

            "bg-white/60 text-gray-600 border-gray-300"

          }

          `}

        >

          👏 {clapEnabled
            ? "Clap Search ON"
            : "Clap Search OFF"
          }


        </motion.button>

      )}



    </div>

  );

}


export default SearchBar;