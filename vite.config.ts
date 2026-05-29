import { defineConfig } from 'vite'

import allPlugins from "./plugin/all"

// https://vite.dev/config/
export default defineConfig({
  base: '/lbftag/',
  plugins: allPlugins(),
  // build: {
  //   rolldownOptions:{
  //     external: ['naive-ui']
  //   }
  // }
})
