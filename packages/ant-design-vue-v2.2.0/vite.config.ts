import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import {Alias, defineConfig, BuildOptions, ConfigEnv, UserConfig} from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  let docsBuild: {base?: string, build?: BuildOptions} = {}
  if (mode === 'docs') {
    docsBuild.base = './'
    docsBuild.build = {
      outDir: '../../docs/.vitepress/dist/bdp-ant-design-vue-v2.2.0'
    }
  }
  return {
    server: {
      port: 3100
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          hack: `@import "${resolve(__dirname, 'theme/dfm.less')}";`
        },
      },
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: ['ant-design-vue', 'vue', 'xe-utils']
      },
      lib: {
        entry: resolve(__dirname, './components/index.ts'),
        name: 'bdpMidUi',
        fileName: 'bdp-ant-design-vue-v2.2.0',
        formats: ['es', 'cjs', 'umd', 'iife']
      },
    },
    resolve: {
      alias: await alias() as Alias[],
    },
    ...docsBuild
  }
})
