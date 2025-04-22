import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

import packageJSON from './package.json';

import { resolve as resolvePath } from 'path';
import copy from 'rollup-plugin-copy';

const sourcemap = false;
const input = 'src/index.ts';
const banner = `/* @license ${packageJSON.name} v${packageJSON.version} */`;

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    input,
    output: Object.values(packageJSON.bin).map((bin) => ({
      format: 'esm',
      file: bin,
      sourcemap,
      banner
    })),
    plugins: [
      alias({
        entries: [{ find: '@', replacement: resolvePath(__dirname, './src') }]
      }),
      resolve({
        extensions: ['.js', '.ts']
      }),
      commonjs({
        include: /node_modules/,
        ignoreDynamicRequires: true
      }),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: { noCheck: isDev },
        noForceEmit: true
      }),
      babel({
        exclude: /node_modules/,
        extensions: ['.js', '.ts']
      }),
      json(),
      copy({
        targets: [{ src: 'resources/*', dest: 'bin/resources' }]
      })
    ]
  }
];
