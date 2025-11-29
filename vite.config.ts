import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0', // Permet l'accès depuis le réseau local
    open: true, // Ouvre automatiquement le navigateur
    strictPort: false, // Change de port si 3000 est occupé
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1000,
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    open: true,
  }
});
