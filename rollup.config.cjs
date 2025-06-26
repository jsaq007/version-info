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
    external: ['react'],
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