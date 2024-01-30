function uuid(num = 36) {
  const url = URL.createObjectURL(new Blob())
  const uid = url.substr(-num) // blob:https://xxx.com/b250d159-e1b6-4a87-9002-885d90033be3
  URL.revokeObjectURL(url) // 释放引用URL对象
  return uid
}

const urlUtil = {uuid}

export default urlUtil
