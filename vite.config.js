import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    assetsInlineLimit: 4096, // Inline small assets (<4KB) to reduce HTTP requests
    // Split large vendor libs out of the main bundle so the initial
    // download for first paint is much smaller. Helps LCP / TBT scores.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('react-router')) return 'react-vendor';
          if (id.match(/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/))
            return 'react-vendor';
          if (id.includes('framer-motion') || id.includes('/motion/'))
            return 'motion';
          if (id.includes('firebase')) return 'firebase';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('@stripe')) return 'stripe';
          return 'vendor';
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
