import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'chart.js', 'react-chartjs-2', 'framer-motion', 'lucide-react', 'axios', 'socket.io-client']
        }
      }
    }
  }
})
