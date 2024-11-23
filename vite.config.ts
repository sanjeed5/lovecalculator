import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: 'G-186K5NZKSB',
      },
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
