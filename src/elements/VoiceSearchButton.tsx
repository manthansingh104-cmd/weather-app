import { motion } from "framer-motion";


interface VoiceSearchButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
}



function VoiceSearchButton({
  isListening,
  isSupported,
  onClick,
}: VoiceSearchButtonProps) {


  if (!isSupported) return null;



  return (

    <motion.button

      type="button"

      onClick={onClick}

      whileHover={{
        scale:1.05
      }}

      whileTap={{
        scale:0.95
      }}

      transition={{
        type:"spring",
        stiffness:400,
        damping:15
      }}


      className={`

      relative

      flex

      items-center

      justify-center


      w-10
      h-10


      sm:w-auto
      sm:h-auto


      sm:px-4

      sm:py-2


      rounded-lg


      transition-colors


      overflow-hidden


      ${
        isListening

        ?

        "bg-red-500 text-white hover:bg-red-600"

        :

        "bg-white/90 text-gray-700 hover:bg-white"

      }

      `}


      title={
        isListening
        ? "Listening... tap to stop"
        : "Search by voice"
      }

    >



      {isListening ? "🔴" : "🎤"}




      {isListening && (

        <motion.span

          className="
          absolute

          inset-0

          rounded-lg

          bg-red-400/50

          "

          animate={{
            opacity:[
              0.5,
              0,
              0.5
            ]
          }}

          transition={{
            repeat:Infinity,
            duration:1.2
          }}

        />

      )}




      <span
        className="
        relative
        z-10
        "
      >
        {isListening ? "🔴" : "🎤"}
      </span>



    </motion.button>

  );

}


export default VoiceSearchButton;