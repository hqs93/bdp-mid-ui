import { App, Component } from "vue";
import { AsyncBdpTree, BdpTree } from "../components/index";

const AntdvComponents: Component[] = [
  AsyncBdpTree,
  BdpTree
]

const installer = (app: App) => {
  AntdvComponents.forEach((comp: Component) => app.use(comp as any))
}

export default installer
