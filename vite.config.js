import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1', // Bind the server to 127.0.0.1
    port: 5173,         // Specify the port (default is 5173)
    cors: true,         // Enable CORS if you need it
  },
  plugins: [react(),  tailwindcss(),],
})
