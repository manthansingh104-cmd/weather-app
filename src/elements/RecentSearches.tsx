import { motion } from "framer-motion";

interface RecentSearchesProps {
  recent: string[];
  favorites: string[];
  onSelect: (city: string) => void;
  onToggleFavorite: (city: string) => void;
}

function RecentSearches({
  recent,
  favorites,
  onSelect,
  onToggleFavorite,
}: RecentSearchesProps) {
  if (recent.length === 0 && favorites.length === 0) return null;

  return (
    <div className="w-full max-w-md flex flex-col gap-2 items-center">
      {favorites.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {favorites.map((city) => (
            <motion.button
              key={city}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onSelect(city)}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-300/40 text-white text-sm hover:bg-yellow-400/30 transition"
            >
              ⭐ {city}
            </motion.button>
          ))}
        </div>
      )}

      {recent.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {recent.map((city) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-sm"
            >
              <button onClick={() => onSelect(city)} className="hover:underline">
                {city}
              </button>
              <button
                onClick={() => onToggleFavorite(city)}
                className="text-yellow-300 hover:text-yellow-200"
                title="Add to favorites"
              >
                {favorites.includes(city) ? "★" : "☆"}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentSearches;