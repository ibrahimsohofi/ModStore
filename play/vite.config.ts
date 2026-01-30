import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { analyzer } from 'vite-bundle-analyzer';
import { visualizer } from 'rollup-plugin-visualizer';
import dynamicImport from '@rollup/plugin-dynamic-import-vars';
import { VitePWA } from 'vite-plugin-pwa';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    // PWA plugin for enhanced caching and offline support
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit for large game images
        globIgnores: [
          '**/images/games/**/*.{png,jpg,jpeg}', // Exclude large game images from precaching
          '**/node_modules/**/*'
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
              }
            }
          },
          {
            urlPattern: /\/images\/games\/.*\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'game-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'logo.svg'],
      manifest: false, // Use the existing manifest.json file
      devOptions: {
        enabled: false
      }
    }),
    // Gzip compression
    command === 'build' && viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1KB
      deleteOriginFile: false
    }),
    // Brotli compression for better compression ratio
    command === 'build' && viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Bundle analyzer - only include when ANALYZE=true
    mode === 'analyze' && analyzer({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json'
    }),
    // Rollup visualizer for bundle analysis
    command === 'build' && visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap'
    }),
    // Dynamic imports optimization
    dynamicImport({
      include: ['**/*.tsx', '**/*.ts'],
      exclude: ['node_modules/**']
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep React ecosystem together to prevent hooks issues
          if (id.includes('node_modules')) {
            // Keep React and React-DOM together in the same chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'ui';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'forms';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1] || '';

          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'media';
          } else if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'images';
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'fonts';
          }

          return `assets/${extType}/[name]-[hash][extname]`;
        }
      }
    },

    // Optimize assets
    assetsInlineLimit: 1024,
    cssCodeSplit: true,

    // Minification
    minify: 'terser',
    target: 'esnext',

    // Source maps for production debugging
    sourcemap: false,

    // Chunk size warnings
    chunkSizeWarningLimit: 500,

    // Terser options
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      }
    }
  },

  // Development optimizations
  server: {
    open: false,
    host: '0.0.0.0',
    port: 5173
  },

  // Preview settings
  preview: {
    host: '0.0.0.0',
    port: 4173
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react'
    ],
    exclude: []
  },

  // Define environment variables
  define: {
    'process.env': {},
  },

  // CSS optimization
  css: {
    devSourcemap: true
  }
}));
