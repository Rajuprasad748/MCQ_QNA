import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Import the React plugin
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), // Add the React plugin here
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.jsonserve.com/Uw5CrX',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})