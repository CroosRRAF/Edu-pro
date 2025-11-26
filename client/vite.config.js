import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html",
    }),
  ],
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    chunkSizeWarningLimit: 1000, // Warn if chunk > 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          "vendor-react": ["react", "react-dom", "react-router-dom"],

          // Form libraries
          "vendor-forms": ["react-hook-form"],

          // Chart library (large)
          "vendor-charts": ["recharts"],

          // Export libraries (used less frequently)
          "vendor-export": ["jspdf", "jspdf-autotable", "xlsx", "file-saver"],

          // Real-time
          "vendor-socket": ["socket.io-client"],

          // Icons and utilities
          "vendor-utils": ["lucide-react", "axios", "framer-motion"],
        },
      },
    },
  },
  define: {
    "process.env": {},
  },
  // Performance optimizations
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
});
