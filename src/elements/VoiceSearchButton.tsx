import { motion } from "framer-motion";

interface VoiceSearchButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
}

function VoiceSearchButton({ isListening, isSupported, onClick }: VoiceSearchButtonProps) {
  if (!isSupported) return null; // hides gracefully on browsers without Web Speech API

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`relative px-4 py-2 rounded-lg transition-colors ${
        isListening
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-white/90 text-gray-700 hover:bg-white"
      }`}
      title={isListening ? "Listening... tap to stop" : "Search by voice"}
    >
      {isListening ? "🔴" : "🎤"}
      {isListening && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-red-400/50"
          animate={{ opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      )}
    </motion.button>
  );
}

export default VoiceSearchButton;