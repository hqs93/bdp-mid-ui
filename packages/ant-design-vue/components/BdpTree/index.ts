import {Component, defineAsyncComponent} from "vue";
export const AsyncBdpTree = defineAsyncComponent<Component>(() => import('./src/tree.vue')) // 异步组件
export { default as BdpTree } from './src/tree.vue'; // 同步组件
export * from './src/utils'
export * from './src/types'
