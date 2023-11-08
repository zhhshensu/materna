import { defineConfig } from 'tsup';
import { globSync } from 'glob';
import path from 'path';

export default defineConfig({
  entry: globSync(['./src/**/*.ts']),
  tsconfig: path.join(__dirname, './tsconfig.build.json'),
  outDir: path.join(__dirname, 'dist'),
});
