import path from 'path'
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
      port: 3300
    },
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
    },
    resolve: {
      alias: await alias() as Alias[]
    },
    ...docsBuild
  }
})
