import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // GitHub Pages 部署路径
  const base = command === 'build' ? '/SmartKingCardGame/' : '/'
  
  return {
    plugins: [react()],
    base: base,
    server: {
      allowedHosts: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 优化构建
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
