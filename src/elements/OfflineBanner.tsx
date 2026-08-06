import { motion, AnimatePresence } from 'framer-motion';
import { useOfflineStatus } from '../hooks/useOfflineStatus';

/**
 * OfflineBanner Component
 * 
 * Displays a glassmorphic offline notification when the user loses internet connectivity.
 * Shows the offline status, informs user that previously loaded weather data is still available,
 * and prompts them to reconnect.
 * 
 * Features:
 * - Glassmorphic design matching the app's aesthetic
 * - Smooth fade-in/out animations with Framer Motion
 * - Accessible color scheme (high contrast)
 * - Fixed positioning so it's always visible
 */
export const OfflineBanner = () => {
    
  const isOffline = useOfflineStatus();

  return (
    <AnimatePresence mode="wait">
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-11/12"
        >
          {/* Glassmorphic container */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl">
            {/* Content wrapper */}
            <div className="p-4 flex items-center gap-3">
              {/* Animated offline icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                  <span className="text-xl">📡</span>
                </div>
              </motion.div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  You're Offline
                </h3>
                <p className="text-xs text-white/70 mt-1 line-clamp-2">
                  Previously loaded weather is still available. Please reconnect to refresh.
                </p>
              </div>
            </div>

            {/* Animated border accent */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                pointerEvents: 'none',
              }}
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;