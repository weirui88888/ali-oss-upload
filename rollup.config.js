import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

import resolve from 'rollup-plugin-node-resolve'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'

const footer = `
if(typeof window !== 'undefined') {
  window._ALI_OSS_UPLOAD_VERSION_ = '${pkg.version}'
}`

export default {
  input: './src/index.ts',
  external: ['ali-oss'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
      footer
    },
    {
      file: pkg.module,
      format: 'esm',
      footer
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: 'AliOssUpload',
      footer,
      globals: {
        'ali-oss': 'OSS'
      }
    }
  ],
  plugins: [typescript(), commonjs(), resolve(), terser(), json(), builtins()]
}
