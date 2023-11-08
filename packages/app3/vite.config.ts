import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.join(__dirname, './src') }],
  },
  build: {
    rollupOptions: {
      input: {
        // renderer: path.join(__dirname, 'src', 'app', 'index.html'),
      },
    },
    // outDir: path.join(__dirname, 'dist/app'),
    minify: true,
    ssr: false,
    emptyOutDir: false,
  },
})
