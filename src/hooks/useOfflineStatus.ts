import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the application is offline or online.
 * 
 * Returns: boolean - true if offline, false if online
 * 
 * Uses window.navigator.onLine and listens to online/offline events.
 * Provides real-time status updates when network connectivity changes.
 */
export const useOfflineStatus = (): boolean => {
  // Initialize with current online status
  const [isOffline, setIsOffline] = useState<boolean>(
    () => !navigator.onLine
  );

  useEffect(() => {
    // Handler for going offline
    const handleOffline = (): void => {
      setIsOffline(true);
    };

    // Handler for coming online
    const handleOnline = (): void => {
      setIsOffline(false);
    };

    // Add event listeners
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Cleanup event listeners on unmount
    return (): void => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return isOffline;
};