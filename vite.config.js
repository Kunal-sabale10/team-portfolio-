import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4004,
    host: true,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'lucide-react', 'lenis', 'canvas-confetti']
        }
      }
    }
  }
})