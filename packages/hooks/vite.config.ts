import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { Alias, ConfigEnv, defineConfig, UserConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  return {
    server: {
      port: 3400
    },
    plugins: [vue()],
    base: './',
    build: {
      rollupOptions: {
        external: ['echarts', 'vue']
      },
      lib: {
        entry: resolve(__dirname, './components/index.ts'),
        name: 'bdpMidUi',
        fileName: 'bdp-hooks',
        formats: ['es', 'cjs', 'umd', 'iife']
      },
      outDir: '../../dist/bdp-hooks',
    },
    resolve: {
      alias: [
        ...await alias() as Alias[]
      ],
    }
  }
})
