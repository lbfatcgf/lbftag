import { defineConfig } from 'vite'

import allPlugins from "./plugin/all"
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/lbftag/',
  server:{
    proxy:{
      "/api":{
        target:"http://127.0.0.1:6677/api",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: allPlugins(),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
