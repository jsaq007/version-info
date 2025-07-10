import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { default as terser } from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

export default [
  // Main library (client-safe)
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['react', 'child_process', 'fs', 'path'],
  },
  // Client-only library (no server-side plugins)
  {
    input: 'src/client-only.ts',
    output: [
      {
        file: 'dist/client-only.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/client-only.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['react', 'child_process', 'fs', 'path'],
  },
  // Core-only library (client-safe, no React)
  {
    input: 'src/core-only.ts',
    output: [
      {
        file: 'dist/core-only.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/core-only.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['child_process', 'fs', 'path'],
  },
  // Vite plugin (server-side) - ESM build (bundle everything)
  {
    input: 'src/vite.ts',
    output: {
      file: 'dist/vite-plugin.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: [], // bundle everything for ESM
  },
  // Vite plugin (server-side) - CJS build (externalize node built-ins)
  {
    input: 'src/vite.ts',
    output: {
      file: 'dist/vite-plugin.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['vite', 'child_process', 'fs', 'path'],
  },
  // Webpack plugin (server-side)
  {
    input: 'src/webpack.ts',
    output: [
      {
        file: 'dist/webpack-plugin.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/webpack-plugin.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['webpack'],
  },
  // Type definitions
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'dist/client-only.d.ts',
    output: [{ file: 'dist/client-only.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'dist/core-only.d.ts',
    output: [{ file: 'dist/core-only.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'dist/vite-plugin.d.ts',
    output: [{ file: 'dist/vite-plugin.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
  {
    input: 'dist/webpack-plugin.d.ts',
    output: [{ file: 'dist/webpack-plugin.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
]; 