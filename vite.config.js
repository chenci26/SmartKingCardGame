import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/SmartKing/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    server: {
      allowedHosts: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 生成 source map 以便調試
      sourcemap: false,
      // 優化構建
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material'],
          }
        }
      }
    }
  }
}) 