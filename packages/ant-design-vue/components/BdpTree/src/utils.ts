import { cloneDeep, isObject, uniqBy } from "lodash"
import { isArray, toArrayTree, toTreeArray } from "xe-utils";
import type { Recordable, ValueType, TreeNode, TreeMap, ResultType, FieldNames } from "./types"
export class TreeUtils {
  option: FieldNames // 映射字段
  dataSource: TreeNode[]
  rootIds: ValueType[] = []
  treeData: TreeNode[] = []
  treeMap: TreeMap = new Map()
  treeType = 'tree'
  constructor(args: Recordable) {
    const { option, dataSource } = cloneDeep(args)
    this.option = option
    this.dataSource = dataSource
    this.initData()
    this.resultData()
  }
  initData() {
    const { option, dataSource } = this
    const { children } = option
    if (isArray(dataSource) && dataSource.length > 0) {
      if (dataSource.some((v: Recordable) => v && isArray(v[children]) && v[children].length > 0)) {
        this.treeType = 'tree'
        this.treeToArray()
      } else {
        this.treeType = 'array'
        this.arrayToTree()
      }
    } else {
      this.treeType = 'none'
      throw new TypeError('Not an array')
    }
  }
  arrayToTree() {
    const { option, dataSource } = this
    const { children, parentId, id } = option
    this.treeData = toArrayTree(dataSource, { strict: false, parentKey: parentId, key: id, children })
    this.treeMap = new Map(dataSource.map((v: Recordable) => {
      return [v[id], v]
    })) as any
    this.rootIds = dataSource.filter((v: TreeNode) => !this.treeMap.get(v[parentId])).map((v: TreeNode) => v[id]) as ValueType[]
  }
  treeToArray() {
    const { option, dataSource } = this
    const { children, parentId, id } = option
    this.treeData = cloneDeep(dataSource)
    // 获取根节点
    this.rootIds = this.treeData.filter((v: TreeNode) => !this.treeMap.get(v[parentId])).map((v: TreeNode) => v[id]) as ValueType[]
    const tmpArr: TreeNode[] = toTreeArray(this.treeData, { children, clear: false })
    this.treeMap = new Map(tmpArr.map((v: Recordable) => {
      return [v[id], v]
    })) as any
  }
  lookUpTree(upId: ValueType): TreeNode[] {
    const { treeMap, rootIds, option } = this
    const { parentId, id } = option
    if (!treeMap.size || treeMap.size === 0) return []
    const arr: TreeNode[] = []
    let idx = treeMap.size + 1
    const findNode = (findId: ValueType): void => {
      idx--
      if (idx === 0) return console.log(new Error())
      const node = treeMap.get(findId)
      if (node) {
        arr.unshift(node)
        if (!rootIds.includes(node[id])) {
          findNode(node[parentId])
        }
      }
    }
    findNode(upId)
    return arr
  }

  queryParentNode(queryIds: ValueType[]): TreeNode[] {
    const { treeMap } = this
    const { id, parentId, children } = this.option
    const filterIds: number[] | string[] = []
    queryIds.forEach((v: ValueType) => {
      const arr = this.lookUpTree(v).map((v: Recordable) => v[id]) as number[] & string[]
      filterIds.push(...arr)
    })
    const filterNodes: TreeNode[] = Array.from(new Set(filterIds as any)).map((v: any) => {
      const tmp: any = cloneDeep(treeMap.get(v))
      if (tmp.children) delete tmp.children
      return tmp
    })
    const result = toTreeArray(filterNodes, { children, clear: false })
    return uniqBy(result, id)
  }

  resultData(): ResultType {
    const { treeData, treeMap, option, rootIds } = this
    return { treeData, treeMap, option, rootIds }
  }
}
