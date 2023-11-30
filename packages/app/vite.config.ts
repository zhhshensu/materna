import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), react()],
  resolve: {
    alias: [{ find: '@', replacement: path.join(__dirname, './src') }],
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
})
