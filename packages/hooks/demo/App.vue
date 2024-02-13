<template>
  <button @click="() => setTrue()">setTrue</button>
  <button @click="() => setFalse()">setFalse</button>
</template>

<script lang="ts" setup>
import {useRenderChart} from '../components'
import { useBoolean } from 'vue-hooks-plus'
import {watch} from "vue";

const [flag, { set, setFalse, setTrue }] = useBoolean(true)

console.log('useRenderChart=========>', useRenderChart())
watch(flag, (value) => {
  console.log('flag=========>', value)
})
</script>

<style lang="less">
body {
  background-color: transparent !important;
}
</style>
