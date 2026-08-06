import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-md flex flex-col items-center gap-4"
    >
      <div className="w-full h-40 rounded-3xl bg-white/60 overflow-hidden relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        />
      </div>

      <div className="grid grid-cols-5 gap-3 w-full">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-2xl bg-white/60 overflow-hidden relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                delay: i * 0.1,
                ease: "linear",
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Loader;