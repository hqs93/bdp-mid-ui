<template>
  <div class="basic-tree">
    <!-- slot-search -->
    <slot name="search" v-if="slots.search"></slot>
    <a-input
        v-if="!slots.search"
        placeholder="请输入关键字"
        v-model:value="searchValue"
        class="tree-search"
        allowClear>
      <template #suffix>
        <search-outlined style="color: rgba(0, 0, 0, 0.45); font-size: 16px;" />
      </template>
    </a-input>
    <a-spin :spinning="loading" class="spin-class">
      <a-tree
          class="tree-operation-class"
          v-if="treeData.length"
          v-bind="$attrs"
          :treeData="treeData"
          :field-names="fieldNames"
          :default-expand-all="defaultExpandAll"
          :auto-expand-parent="autoExpandParent"
          @expand="onExpand"
          @select="onSelect"
          v-model:selectedKeys="tree.selectedKeys"
      >
        <template #title="node">
          <!-- slot-row -->
          <slot name="row" v-if="slots.row" :node="node"></slot>
          <template v-else>
            <span v-if="node[fieldNames.title as string].indexOf(searchValue) > -1">
              {{ node[fieldNames.title as string].substr(0, node[fieldNames.title as string].indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{ node[fieldNames.title as string].substr(node[fieldNames.title as string].indexOf(searchValue) + searchValue.length) }}
            </span>
            <span v-else>{{ node[fieldNames.title as string] }}</span>
          </template>
        </template>

        <!-- slot-switcherIcon 展开图标 -->
        <template #switcherIcon v-if="slots.switcherIcon">
          <slot name="switcherIcon"></slot>
        </template>
        <!-- slot-custom 自定义图标 -->
        <template #custom="{selected}" v-if="slots.custom">
          <slot name="custom" :selected="selected"></slot>
        </template>
        <!-- slot-icon 静态图标 -->
        <template #icon v-if="slots.icon">
          <slot name="icon"></slot>
        </template>
      </a-tree>
    </a-spin>
  </div>
</template>

<script lang='ts' setup>
import {nextTick, reactive, watch, defineEmits, defineProps, defineExpose, toRaw, useSlots, withDefaults, toRefs, ref} from 'vue';
import type { TreeProps, FieldNames, TreeNode, Recordable } from "./types";
import {isBoolean, isArray, isString, isNumber} from "xe-utils";
import {TreeUtils} from "./utils";

// props&emits
const props = withDefaults(
    defineProps<{
      loading?: boolean
      autoExpandParent?: boolean
      defaultExpandAll?: boolean
      dataSource: TreeNode[]
      fieldNames?: FieldNames
      expandedKeys?: any[]
      selectedKeys?: any[]
    }>(),
    {
      fieldNames: () => ({children: 'children', title:'title', key:'id', parentId: 'parentId', id: 'id'})
    }
)

const emit = defineEmits([ 'update:expandedKeys', 'update:selectedKeys', 'update:value', 'change', 'check', 'update:searchValue',])

const slots = useSlots()
// console.log('slots', slots)
const treeRef = ref()
// <TreeProps>
const tree = reactive<TreeProps>({
  loading: false,
  utils: {},
  treeData: [],
  dataSource: [],
  searchValue: '',
  fieldNames: props.fieldNames,
  autoExpandParent: true,
  defaultExpandAll: true,
  expandedKeys: [],
  selectedKeys: []
})

const {loading, treeData, searchValue, fieldNames, autoExpandParent, defaultExpandAll, expandedKeys, selectedKeys} = toRefs(tree)
const onExpand = (keys: string[] | number[], expanded: Recordable) => {
  tree.autoExpandParent = false;
  tree.expandedKeys = keys;
  emit('update:expandedKeys', keys)
};
const onSelect = (selectedKeys: string[] | number[], e: Recordable) => {
  if (selectedKeys.length > 0) {
    tree.selectedKeys = selectedKeys
  } else {
    tree.selectedKeys = []
  }
  emit('update:selectedKeys', selectedKeys)
}

const searchLargeHandle = (value: string) => {
  const {title, id} = toRaw(tree.fieldNames)
  const treeArray = Array.from(tree.utils.treeMap.values())
      .filter((v: any) => v[title as string].indexOf(value) > -1)
      .map((v: any) => toRaw(tree.utils.treeMap.get(v[id])))
  const {treeData} = new TreeUtils({
    option: toRaw(tree.fieldNames),
    dataSource: treeArray,
  })
  tree.treeData = treeData
}
const searchHandle = (value: string) => {
  const {title, id} = toRaw(fieldNames.value)
  const treeArray = Array.from(tree.utils.treeMap.values())
      .filter((v: any) => v[title as string].indexOf(value) > -1)
      .map((v: any) => v[id])
  const expand = tree.utils.queryParentNode(treeArray).map((v: TreeNode) => v[id]);
  tree.autoExpandParent = true;
  tree.expandedKeys = expand
  emit('update:expandedKeys', expand)
}

/* 单一监听源,只监听常用属性,其他配置项由$attrs自动绑定 */
// 数据源
watch(() => props.dataSource, (value) => {
  if (isArray(value) && value.length > 0) {
    tree.utils = new TreeUtils({
      option: toRaw(tree.fieldNames),
      dataSource: toRaw(value)
    })
    tree.treeData = tree.utils.treeData
    // tree.selectedKeys = tree.treeData.length > 0 ? [tree.treeData[0][tree.fieldNames.id]] : []
  }
},{ immediate: true, flush: 'post' })
// 展开节点
watch(() => props.expandedKeys, (value) => {
  if (isArray(value)) tree.expandedKeys = value
},{ immediate: true, flush: 'post' })
// 选中节点
watch(() => props.selectedKeys, (value) => {
  if (isArray(value)) tree.selectedKeys = value
},{ immediate: true, flush: 'post' })
// 搜索文本
watch(() => tree.searchValue, (value) => {
  nextTick(() => {
    if (isString(value) && value !== '') {
      // 大于1000条数据,重渲染dom
      if (tree.utils.treeMap.size > 1000) {
        searchLargeHandle(value)
      } else {
        searchHandle(value)
      }
    } else {
      if (tree.utils.treeMap.size > 1000) {
        tree.utils = new TreeUtils({
          option: toRaw(tree.fieldNames),
          dataSource: toRaw(props.dataSource)
        })
        tree.treeData = tree.utils.treeData
        tree.selectedKeys = tree.treeData.length > 0 ? [tree.treeData[0][tree.fieldNames.id]] : []
      }
    }
  })
}, { flush: 'post' });
// loading加载
watch(
    () => props.loading, (value) => {
      if (isBoolean(value)) tree.loading = value
    }, { immediate: true, flush: 'post' });


// 暴露组件属性&方法
defineExpose({
  ...toRefs(tree)
})
</script>

<style lang='less'>
@main-color: #D32D2D;
@main-height: 48px;
.basic-tree {
  .ant-spin-nested-loading {
    min-height: 200px !important;
  }
  .spin-class {
    min-height: 200px !important;
    width: 100%;
    margin-top: 50px;
  }
  // 搜索模版
  .tree-search {
    margin: 8px 0;
    .ant-input {
      font-size: 12px !important;
    }
  }
  // 选择框
  .ant-tree-checkbox {
    height: @main-height !important;
    .ant-tree-checkbox-inner {
      top: 50% !important;
      transform: translateY(-50%) !important;
    }
  }
  // 展开图标
  .ant-tree-switcher {
    height: @main-height !important;
    line-height: @main-height !important;
  }
  // 标题图标
  .ant-tree-iconEle {
    position: relative;
    height: @main-height !important;
    .anticon {
      position: absolute !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
    }
  }
  // node文字
  .ant-tree-node-content-wrapper {
    width: calc(100% - 24px) !important;
    display: inline-block !important;
    position: relative;
    line-height: @main-height !important;
    height: 48px !important;
    &:hover .ant-tree-title .title-parent .operation-parent {
      opacity: 1;
    }
    .ant-tree-title {
      width: 100% !important;
      display: inline-block !important;
      .title-parent {
        display: inline-block;
        width: 100%;
        position: relative;
        .name {
          width: calc(100% - 36px) !important;
          display: inline-block !important;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .operation-parent {
          float: right;
          opacity: 0;
          color: rgba(0, 0, 0, 70%);
          .operation-icon {
            &:hover {
              color: @main-color;
            }
          }
        }
        .ant-tree-input {
          // 这个margin和width是为了让input和其父元素保持宽度一致
          margin: 8px -5px 0px -5px;
          width: calc(100% + 10px);
          line-height: @main-height;
          height: 28px;
          padding: 0 5px 0 5px;
          border: 1px solid @main-color;
          box-shadow: 0 0 0 0 !important;
          .ant-input {
            color: @main-color;
          }
          .ant-input-affix-wrapper {
            cursor: default !important;
          }
          .ant-input-suffix {
            color: @main-color;
            font-size: 12px;
            cursor: pointer !important;
            span {
              cursor: pointer !important;
              svg {
                &:hover {
                  color: @main-color;
                }
              }
            }
          }
        }
      }
    }
    // 调整选中颜色
    &.ant-tree-node-selected {
      background-color: #D32D2D1a !important;
      color: #c23d36;
    }
  }
  // li
  li {
    // 调整节点之间的间距
    padding: 2px 0;
    .ant-tree-child-tree > li:first-child {
      padding-top: 4px;
    }
    // 调整节点左侧icon的高度
    span.ant-tree-switcher,
    span.ant-tree-switcher {
      height: 32px;
      line-height: 28px;
    }
  }
  // 下拉菜单
  .ant-dropdown-menu {
    margin: 0 !important;
    padding: 4px 0 !important;
    list-style-type: none !important;
    .ant-dropdown-menu-item {
      margin: 0 !important;
      padding: 5px 12px !important;
      white-space: nowrap !important;
      &::before {
        content: "";
        border-left: 0 !important;
      }
    }
  }
}
</style>
