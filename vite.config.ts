import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import dts from 'vite-plugin-dts'
import { ViteAliases } from 'vite-aliases'


const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true
  },
  build: {
    target: 'esnext',
    minify: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'mui-otp-input',
      fileName: format => `mui-otp-input.${format}.js`
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        globals: {
          react: 'React',
          'react/jsx-runtime': 'jsxRuntime',
        }
      }
    }
  },
  plugins: [
    peerDepsExternal(),
    react(),
    ViteAliases({
      deep: false,
      createGlobalAlias: false,
      useTypescript: true
    }),
    dts({
      exclude: ['src/components/**/*'],
      insertTypesEntry: true
    })
  ]
})
