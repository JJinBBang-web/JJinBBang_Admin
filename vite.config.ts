import { defineConfig, loadEnv, type ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:8080'

  const createApiProxy = (target: string = proxyTarget): ProxyOptions => ({
    target,
    changeOrigin: true,
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('Forwarded', 'host=localhost:5173;proto=http')
      })
    },
  })

  return {
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
  }
})
