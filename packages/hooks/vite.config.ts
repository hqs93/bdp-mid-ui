import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import {Alias, BuildOptions, ConfigEnv, defineConfig, UserConfig} from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  let docsBuild: {base?: string, build?: BuildOptions} = {}
  if (mode === 'docs') {
    docsBuild.base = './'
    docsBuild.build = {
      outDir: '../../docs/.vitepress/dist/bdp-hooks'
    }
  }
  return {
    server: {
      port: 3400
    },
    plugins: [vue()],
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
    },
    resolve: {
      alias: [
        ...await alias() as Alias[]
      ],
    }
  }
})
