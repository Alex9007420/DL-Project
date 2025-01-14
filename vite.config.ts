import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from outside the container
    port: 5173,  // Ensure Vite uses port 5173
  },
})
