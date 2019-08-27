import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  plugins: [
    babel({
      extensions: ['.ts'],
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
  ],
  output: {
    file: 'main.js',
    format: 'cjs',
  },
};
