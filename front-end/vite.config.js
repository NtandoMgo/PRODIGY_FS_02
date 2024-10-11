import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {   // just a dev env, not gonna deploy... avoid the CORS issues
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        },
    },
},
})
