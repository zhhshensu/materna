import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root: path.join(__dirname, 'src', 'app'),
  publicDir: path.join(__dirname, 'src/app/assets'),
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        renderer: path.join(__dirname, 'src', 'app', 'index.html'),
      },
    },
    outDir: path.join(__dirname, 'dist/app'),
    minify: true,
    ssr: false,
    emptyOutDir: false,
  },
})
