import path from 'path'
import { ConfigEnv, defineConfig, UserConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  return {
    server: {
      port: 3300
    },
    base: './',
    build: {
      rollupOptions: {
        external: ['vue', 'ts-md5']
      },
      lib: {
        entry: path.resolve(__dirname, './index.ts'),
        name: 'bdpMidUi',
        fileName: 'bdp-shared',
        formats: ['es', 'cjs', 'umd', 'iife']
      },
      outDir: '../../dist/bdp-shared',
    },
    resolve: {
      alias: await alias()
    },
  }
})
