import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: path.join(__dirname, 'src', 'renderer'),
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        renderer: path.join(__dirname, 'src', 'renderer', 'index.html'),
      },
    },
    outDir: path.join(__dirname, 'build'),
    minify: true,
    ssr: false,
    emptyOutDir: false,
  },
})
