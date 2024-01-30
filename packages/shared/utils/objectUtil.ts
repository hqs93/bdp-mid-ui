class PropsGetterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropsGetterError';
  }
}
class PropsSetterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PropsSetterError';
  }
}

const objectUtil = {
  /**
   * 从对象中获取指定路径上的属性值
   * @param obj - 要获取属性值的对象
   * @param key - 属性路径，用点号分隔
   * @returns 指定路径上的属性值，如果路径无效则返回undefined
   */
  propsGetter: <T extends Record<string, any>>(
    obj: T,
    key: string
  ): undefined | T[keyof T] => {
    if (!obj) {
      throw new PropsGetterError('Invalid object')
    }
    if (!key && typeof key !== 'string') {
      throw new PropsGetterError('Invalid property path')
    }

    let currentObject: any = obj;
    const keys: string[] = key.split('.');
    for (const k of keys) {
      if (currentObject && typeof currentObject === 'object' && k in currentObject) {
        currentObject = currentObject[k];
      } else {
        return undefined;
      }
    }
    return currentObject
  },
  /**
   * 在对象中设置指定路径上的属性值
   * @param obj - 要设置属性值的对象
   * @param key - 属性路径，用点号分隔
   * @param val - 要设置的属性值
   * @returns 如果设置成功则返回true，否则返回false
   */
  propsSetter: <T extends Record<string, any>>(
    obj: T,
    key: string,
    val: any
  ): boolean => {
    if (!obj) {
      throw new PropsSetterError('Invalid object');
    }
    if (!key || typeof key !== 'string') {
      throw new PropsSetterError('Invalid property path');
    }

    let currentObject: any = obj;
    const keys: string[] = key.split('.');
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (currentObject && typeof currentObject === 'object' && k in currentObject) {
        currentObject = currentObject[k];
      } else {
        currentObject[k] = {};
        currentObject = currentObject[k];
      }
      if (!(currentObject instanceof Object)) {
        throw new PropsSetterError(`Invalid object at property '${keys.slice(0, i + 1).join('.')}'`);
      }
    }
    currentObject[keys[keys.length - 1]] = val;
    return currentObject
  }
}

export default objectUtil
