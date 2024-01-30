import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'

const base = '/'

export default defineConfig({
  title: 'bdp-lib-ui',
  description: '',
  appearance: false,
  base,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/bdp-lib-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/bdp-lib-icon.svg',
    nav,
    sidebar,
    footer
  }
})
