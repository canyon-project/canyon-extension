import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: false,
    rollupOptions: {
      output: {
        entryFileNames: `popup/[name].js`,
        chunkFileNames: `popup/[name].js`,
        assetFileNames: `popup/[name].[ext]`,
      }
    }
  },
  // publicDir: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
})
