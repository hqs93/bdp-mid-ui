import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { Alias, ConfigEnv, defineConfig, UserConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  // let docsBuild = {}
  // if (mode === 'docs') {
  //   docsBuild.base = './'
  //   docsBuild.build = {
  //     outDir: '../../docs/.vitepress/dist/element-plus'
  //   }
  // }
  return {
    server: {
      port: 3200
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          hack: `@import "${resolve(__dirname, 'theme/dfm.less')}";`
        },
      },
    },
    plugins: [vue()],
    base: './',
    build: {
      rollupOptions: {
        external: ['vue', 'xe-utils']
      },
      lib: {
        entry: resolve(__dirname, './index.ts'),
        name: 'bdpMidUi',
        fileName: 'bdp-ant-design-vue',
        formats: ['es', 'cjs', 'umd', 'iife']
      },
      // outDir: '../../dist/bdp-ant-design-vue',
    },
    resolve: {
      alias: [
        ...await alias() as Alias[]
        // { find: /^~/, replacement: '' }
      ],
    },
    // ...docsBuild
  }
})
