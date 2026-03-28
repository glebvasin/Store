import {fileURLToPath, URL} from 'url';

import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env,
    },
    server: {port: 3000},
    plugins: [
      react(),
      svgr(),
      eslint({cache: false, failOnWarning: false, emitWarning: false}),
      checker({
        typescript: true,
      }),
    ],
    build: {
      outDir: './build',
    },
    resolve: {
      alias: [
        {find: '@app', replacement: fileURLToPath(new URL('./src/app', import.meta.url))},
        {find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url))},
        {
          find: '@common',
          replacement: fileURLToPath(new URL('./src/components/common', import.meta.url)),
        },
        {
          find: '@components',
          replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
        },
        {
          find: '@constants',
          replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
        },
        {find: '@context', replacement: fileURLToPath(new URL('./src/context', import.meta.url))},
        {find: '@hooks', replacement: fileURLToPath(new URL('./src/hooks', import.meta.url))},
        {find: '@lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url))},
        {find: '@routes', replacement: fileURLToPath(new URL('./src/routes', import.meta.url))},
        {find: '@store', replacement: fileURLToPath(new URL('./src/store', import.meta.url))},
        {find: '@styles', replacement: fileURLToPath(new URL('./src/styles', import.meta.url))},
        {find: '@utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url))},
      ],
    },
  };
});
