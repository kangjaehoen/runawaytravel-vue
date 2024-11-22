import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  // server: {
  //   proxy: {
  //     '/reservation': {
  //       target: 'http://localhost:8086', // 백엔드 서버의 주소와 포트 (예: Spring Boot 서버)
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/reservation/, '/reservation') 
  //     }
  //   }
  // }
});

