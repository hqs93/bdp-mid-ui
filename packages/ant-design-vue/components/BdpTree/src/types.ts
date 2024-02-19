import { TreeDataItem } from "ant-design-vue/lib/tree/Tree";

type Recordable<T = any> = Record<string, T>

type ValueType = number | string | undefined | null

/**
 * @description
 * 数节点,叶节点,叶子节点;
*/
interface TreeNode extends TreeDataItem {
  id?: ValueType
  parentId?: ValueType
  rootId?: ValueType
  children?: TreeNode[]
  [propName: string]: any // 节点中的其他参数,如果类型明确并且字段统一就逐一声明
}

/**
 * @description
 * 字典树;
*/
type TreeMap = Map<ValueType, TreeNode>

/**
 * @description
 * 自定义字段;
 * id, parentId, rootId 自定义树必要参数;
*/
type FieldNames = {children: string, title: string, key?: string, id: string, parentId: string}

/**
 * @description
 * 树组件默认参数;
*/
interface TreeProps {
  // loading: boolean
  utils: Recordable
  dataSource: Recordable[]
  treeData: TreeNode[]
  // fieldNames: FieldNames
  // selectedKeys: string[] | number[]
  // expandedKeys: string[] | number[]
  autoExpandParent: boolean
  searchValue: string
  defaultExpandAll: boolean
}

interface ResultType {
  treeMap: TreeMap,
  treeData: Array<TreeNode>
  option: FieldNames
  rootIds: ValueType | ValueType[]
}

export type {Recordable, ValueType, TreeNode, TreeMap, ResultType, TreeProps, FieldNames}
