import path from 'path'
import { ConfigEnv, defineConfig, UserConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  return {
    server: {
      port: 3300
    },
    build: {
      rollupOptions: {
        external: ['vue']
      },
      lib: {
        entry: path.resolve(__dirname, './index.ts'),
        name: 'bdpShared',
        fileName: 'bdp-shared',
        formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
  }
})
