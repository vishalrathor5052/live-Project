import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import reactJsx from 'vite-react-jsx';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

const chunkMap = Object.entries({
  mui: '@mui',
  router: 'react-router',
  react: 'react',
  lodash: 'lodash',
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), eslintPlugin(), reactJsx(), tsconfigPaths()],
  server: {
    port: 4000,
  },
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html') },
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            const match = chunkMap.find(chunk => id.includes(chunk[1]));
            if (match) {
              return `vendor_${match[0]}`;
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
