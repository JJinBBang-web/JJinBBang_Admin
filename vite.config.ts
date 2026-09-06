import { defineConfig, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const createApiProxy = (): ProxyOptions => ({
  target: process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:8080',
  changeOrigin: true,
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('Forwarded', 'host=localhost:5173;proto=http')
    })
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': createApiProxy(),
      '/oauth2': createApiProxy(),
      '/login/oauth2': createApiProxy(),
    },
  },
})
