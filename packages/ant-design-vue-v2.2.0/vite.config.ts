import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { defineConfig } from "vite";
import {alias} from '../../scripts'

export default defineConfig( async ({ command, mode }) => {
  // let docsBuild = {}
  // if (mode === 'docs') {
  //   docsBuild.base = './'
  //   docsBuild.build = {
  //     outDir: '../../docs/.vitepress/dist/element-plus'
  //   }
  // }
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
    base: './',
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
      outDir: '../../dist/bdp-ant-design-vue-v2.2.0'
    },
    resolve: {
      alias: await alias(),
    },
    // ...docsBuild
  }
})
