import { defineConfig } from 'tsup'
import { globSync } from 'glob'
import path from 'path'

export default defineConfig({
  entry: globSync(['./src/electron/**/*.ts']),
  tsconfig: path.join(__dirname, 'src/electron/tsconfig.build.json'),
  outDir: path.join(__dirname, 'dist/electron'),
})
