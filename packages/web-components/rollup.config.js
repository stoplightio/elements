import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      include: ['src/**/*.{ts,tsx}'],
    }),
  ],
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: true,
    },
  ],

};
