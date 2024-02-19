import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/table-custom-columns',
      component: () => import('./table/table-custom-columns.vue'),
      name: 'TableCustomColumns'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/table-custom-columns'
    },
  ]
})

export default router
