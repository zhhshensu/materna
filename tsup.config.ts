import { defineConfig } from 'tsup'
import { globSync } from 'glob'
import * as path from 'path'

const tsconfigPath = path.join(__dirname, 'src/electron', 'tsconfig.build.json')

export default defineConfig({
  entry: globSync(['src/electron/**/*.{ts,js}']),
  splitting: false,
  sourcemap: false,
  clean: false,
  // tsconfig: tsconfigPath,
  outDir: path.join(__dirname, 'build'),
})
