import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ConsoleX portfolio — Vite 8 + React 19 + Tailwind CSS 4 (CSS-first config).
// The dev/preview server binds 0.0.0.0:3000 to match the sandbox gateway.
export default defineConfig({
  // relative base → the prebuilt dist/ also works when opened straight from
  // disk (file://) or hosted from a sub-path, without any server config
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
  optimizeDeps: {
    // restrict the dependency scanner to our entry — the sandbox has
    // unrelated .html templates (skills/, upload/) at the project root
    entries: ['index.html'],
  },
})
