import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api-cvm': {
        target: 'http://115.124.105.220',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cvm/, '/API')
      }
    }
  },
  preview: {
    port: 5174,
    host: true,
    proxy: {
      '/api-cvm': {
        target: 'http://115.124.105.220',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-cvm/, '/API')
      }
    }
  }
})
