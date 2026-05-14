import { defineConfig } from 'vite'

import allPlugins from "./plugin/all"

// https://vite.dev/config/
export default defineConfig({
  plugins: allPlugins(),
})
