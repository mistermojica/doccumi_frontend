import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint'
import svgrPlugin from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    eslint(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/store'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '~': path.resolve(__dirname, './node_modules'),
      '@mui/icons-material': path.resolve(__dirname, './node_modules/@mui/icons-material/esm'),
      '@types/scheduler': path.resolve(__dirname, './node_modules/scheduler/cjs'),
      'chart.js': path.resolve(__dirname, './node_modules/chart.js'),
    },
  },
});

// alias: [
//   { find: '@', replacement: path.resolve(__dirname, './src') },
//   { find: '@config', replacement: path.resolve(__dirname, './src/config') },
//   { find: '@plugins', replacement: path.resolve(__dirname, './src/plugins') },
//   { find: '@views', replacement: path.resolve(__dirname, './src/views') },
//   { find: '@mixins', replacement: path.resolve(__dirname, './src/mixins') },
//   { find: '@svg', replacement: path.resolve(__dirname, './src/svg') },
//   { find: '@models', replacement: path.resolve(__dirname, './src/models') },
//   { find: '@components', replacement: path.resolve(__dirname, './src/components') },
// ]