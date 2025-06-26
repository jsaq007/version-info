const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser').default;
const dts = require('rollup-plugin-dts').default;

const packageJson = require('./package.json');

module.exports = [
  // Main library
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
    external: ['react', 'webpack', 'vite'],
  },
  // Core-only library (no React)
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
    external: ['webpack', 'vite'],
  },
  // Vite plugin
  {
    input: 'src/vite.ts',
    output: [
      {
        file: 'dist/vite-plugin.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/vite-plugin.esm.js',
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
    external: ['vite'],
  },
  // Webpack plugin
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