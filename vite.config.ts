import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'
// https://vitejs.dev/config/

export default defineConfig(({ mode, command, ssrBuild }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('env', env)
  return {
    define: {
      globalThis: 'window'
    },
    resolve: {
      alias: {
        process: 'process/browser',
        util: 'util',
        '@': path.resolve(__dirname, 'src'),
        '@@': path.resolve(__dirname, 'src/components')
      }
    },
    plugins: [react(), nodePolyfills()],
    server: {
      port: 5680,
      host: '0.0.0.0'
    }
  }
})
