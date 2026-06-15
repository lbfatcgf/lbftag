import { defineConfig } from 'vite'

import allPlugins from "./plugin/all"

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
  // build: {
  //   rolldownOptions:{
  //     external: ['naive-ui']
  //   }
  // }
})
