import { Md5 } from "ts-md5";
const getNoncestr = () => {
  let d = new Date().getTime();
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
};
const createObj = (f) => {
  const obj = {};
  for (const key of f.keys()) {
    if (!(f.get(key) instanceof File)) {
      obj[key] = f.get(key);
    }
  }
  return JSON.stringify(obj);
};
const creatSigns = (bodyParams) => {
  const noncestr = getNoncestr();
  const timestamp = new Date().getTime();
  const userSecret = window.localStorage.getItem("userSecret") || "";
  const jsonstr = bodyParams ? typeof bodyParams === "object" ? bodyParams instanceof FormData ? createObj(bodyParams) : JSON.stringify(bodyParams) : bodyParams : "";
  const signstr = jsonstr + noncestr + timestamp + userSecret;
  const sign = Md5.hashStr(signstr);
  const o = {
    noncestr,
    timestamp,
    sign
  };
  return o;
};
const signUtil = { getNoncestr, creatSigns };
class PropsGetterError extends Error {
  constructor(message) {
    super(message);
    this.name = "PropsGetterError";
  }
}
class PropsSetterError extends Error {
  constructor(message) {
    super(message);
    this.name = "PropsSetterError";
  }
}
const objectUtil = {
  propsGetter: (obj, key) => {
    if (!obj) {
      throw new PropsGetterError("Invalid object");
    }
    if (!key && typeof key !== "string") {
      throw new PropsGetterError("Invalid property path");
    }
    let currentObject = obj;
    const keys = key.split(".");
    for (const k of keys) {
      if (currentObject && typeof currentObject === "object" && k in currentObject) {
        currentObject = currentObject[k];
      } else {
        return void 0;
      }
    }
    return currentObject;
  },
  propsSetter: (obj, key, val) => {
    if (!obj) {
      throw new PropsSetterError("Invalid object");
    }
    if (!key || typeof key !== "string") {
      throw new PropsSetterError("Invalid property path");
    }
    let currentObject = obj;
    const keys = key.split(".");
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (currentObject && typeof currentObject === "object" && k in currentObject) {
        currentObject = currentObject[k];
      } else {
        currentObject[k] = {};
        currentObject = currentObject[k];
      }
      if (!(currentObject instanceof Object)) {
        throw new PropsSetterError(`Invalid object at property '${keys.slice(0, i + 1).join(".")}'`);
      }
    }
    currentObject[keys[keys.length - 1]] = val;
    return currentObject;
  }
};
function uuid(num = 36) {
  const url = URL.createObjectURL(new Blob());
  const uid = url.substr(-num);
  URL.revokeObjectURL(url);
  return uid;
}
const urlUtil = { uuid };
export { objectUtil, signUtil, urlUtil };
