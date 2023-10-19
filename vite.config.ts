import { fileURLToPath, URL } from 'node:url'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from "path";



export default defineConfig({
  base: '/augmento-admin/',

  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag === 'model-viewer'
        }
      }
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      'three': path.resolve('./node_modules/three'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 8080
  }
})
