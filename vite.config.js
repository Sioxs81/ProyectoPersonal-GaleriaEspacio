import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// El "base" cambia segun el comando:
//  - en desarrollo (npm run dev) se sirve desde "/"
//  - en produccion (npm run build) se sirve desde el subdirectorio del repo,
//    para que funcione correctamente en GitHub Pages.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ProyectoPersonal-GaleriaEspacio/' : '/',
  plugins: [vue()]
}))
