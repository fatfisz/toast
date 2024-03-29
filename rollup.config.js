import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import prependHtml from './rollup-plugins/prependHtml';
import stripSpriteStack from './rollup-plugins/stripSpriteStack';

export default {
  input: 'src/index.ts',
  plugins: [
    stripSpriteStack(),
    babel({
      extensions: ['.ts'],
    }),
    json({
      namedExports: false,
    }),
    nodeResolve({
      extensions: ['.ts'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser({
      toplevel: true,
    }),
    prependHtml({}),
  ],
  output: {
    file: 'index.html',
    format: 'cjs',
  },
};
