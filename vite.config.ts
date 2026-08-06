import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',

      // PWA App Metadata
      manifest: {
        id: '/',
        name: 'Weather App',
        short_name: 'Weather',
        description:
          'A modern premium weather application built with React and TypeScript.',

        theme_color: '#2563EB',
        background_color: '#0F172A',

        display: 'standalone',
        orientation: 'portrait-primary',

        scope: '/',
        start_url: '/',

        // PWA Icons
        icons: [
          {
            src: '/pwa-icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/pwa-icons/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],

        categories: ['weather'],

        // keywords: [
        //   'weather',
        //   'forecast',
        //   'temperature',
        //   'real-time',
        // ],

        // PWA Screenshots
        // IMPORTANT: These must be actual screenshots of your app,
        // NOT your 192x192 or 512x512 icons.
        screenshots: [
          {
            src: '/pwa-icons/screenshot-mobile.png',
            sizes: '320x640',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/pwa-icons/screenshot-desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],

        // PWA Shortcuts
        shortcuts: [
          {
            name: 'Search Weather',
            short_name: 'Search',
            description: 'Search weather for any city',
            url: '/?source=pwa_shortcut_search',
            icons: [
              {
                src: '/pwa-icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
          {
            name: 'My Location',
            short_name: 'Location',
            description: 'Get weather for your location',
            url: '/?source=pwa_shortcut_location',
            icons: [
              {
                src: '/pwa-icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
              },
            ],
          },
        ],

        // Share Target
        share_target: {
          action: '/share',
          method: 'POST',
          enctype: 'application/x-www-form-urlencoded',

          params: {
            title: 'title',
            text: 'text',
            url: 'url',
          },
        },

        prefer_related_applications: false,
      },

      // Service Worker / Workbox
      workbox: {
        runtimeCaching: [
          // Weather API - Network First
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: 'NetworkFirst',

            options: {
              cacheName: 'weather-api-cache',

              networkTimeoutSeconds: 5,

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Images - Cache First
          {
            urlPattern:
              /^https:\/\/.*\.(png|jpg|jpeg|svg|gif|webp)$/i,

            handler: 'CacheFirst',

            options: {
              cacheName: 'image-cache',

              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // Google Fonts - Cache First
          {
            urlPattern:
              /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,

            handler: 'CacheFirst',

            options: {
              cacheName: 'font-cache',

              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },

          // CDN Resources - Cache First
          {
            urlPattern:
              /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,

            handler: 'CacheFirst',

            options: {
              cacheName: 'cdn-cache',

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },

              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],

        // Precache Assets
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}',
        ],

        // Ignore Patterns
        globIgnores: [
          '**/node_modules/**/*',
          'dist/**/*',
        ],

        // Clean Old Caches
        cleanupOutdatedCaches: true,

        // Maximum File Size: 5MB
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },

      // PWA Development Options
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
      },
    }),
  ],
})