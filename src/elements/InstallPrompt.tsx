import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Declare beforeinstallprompt event type for TypeScript
 * This event is fired when the browser detects that an app can be installed
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * InstallPrompt Component
 * 
 * Detects when the app is installable and shows a custom install banner.
 * Uses the beforeinstallprompt event to provide a native install experience.
 * 
 * Features:
 * - Automatic detection of install eligibility
 * - Custom branded install button (premium look)
 * - Dismiss option that hides the banner
 * - Framer Motion animations for smooth transitions
 * - Accessibility-first design
 * - Works on desktop and mobile
 */
export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Handler for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event): void => {
      // Prevent the mini-infobar from appearing
      e.preventDefault();

      // Stash the event for later use
      const event = e as BeforeInstallPromptEvent;
      setDeferredPrompt(event);

      // Show our custom install prompt
      setShowPrompt(true);
    };

    // Handler for app installed event
    const handleAppInstalled = (): void => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return (): void => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async (): Promise<void> => {
    if (!deferredPrompt) return;

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for user choice
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        // User accepted the install prompt
        setIsInstalled(true);
        setShowPrompt(false);
      } else {
        // User dismissed the install prompt
        setShowPrompt(false);
      }

      // Clear the deferred prompt
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  const handleDismiss = (): void => {
    setShowPrompt(false);
  };

  // Don't show if app is already installed or no install prompt available
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          {/* Glassmorphic install banner */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-sky-400/20 to-indigo-600/20 border border-white/30 rounded-2xl shadow-2xl overflow-hidden">
            {/* Gradient accent bar at top */}
            <div className="h-1 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-300" />

            {/* Content */}
            <div className="p-5">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-1">
                  Install Weather App
                </h3>
                <p className="text-sm text-white/80">
                  Get quick access and offline support. Lightning-fast performance.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Install Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstall}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl active:shadow-md"
                >
                  ⬇️ Install
                </motion.button>

                {/* Dismiss Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDismiss}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200 border border-white/20"
                >
                  Not Now
                </motion.button>
              </div>

              {/* Info text */}
              <p className="text-xs text-white/60 mt-3 text-center">
                You can always install it later from your browser menu.
              </p>
            </div>

            {/* Animated shimmer effect */}
           <motion.div
             className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;