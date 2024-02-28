import { Md5 as p } from "ts-md5";
const l = () => {
  let t = new Date().getTime();
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function(e) {
    const r = (t + Math.random() * 16) % 16 | 0;
    return t = Math.floor(t / 16), (e === "x" ? r : r & 3 | 8).toString(16);
  });
}, f = (t) => {
  const e = {};
  for (const r of t.keys())
    t.get(r) instanceof File || (e[r] = t.get(r));
  return JSON.stringify(e);
}, u = (t) => {
  const e = l(), r = new Date().getTime(), o = window.localStorage.getItem("userSecret") || "", s = (t ? typeof t == "object" ? t instanceof FormData ? f(t) : JSON.stringify(t) : t : "") + e + r + o, c = p.hashStr(s);
  return {
    noncestr: e,
    timestamp: r,
    sign: c
  };
}, j = { getNoncestr: l, creatSigns: u };
class x extends Error {
  constructor(e) {
    super(e), this.name = "PropsGetterError";
  }
}
class i extends Error {
  constructor(e) {
    super(e), this.name = "PropsSetterError";
  }
}
const w = {
  propsGetter: (t, e) => {
    if (!t)
      throw new x("Invalid object");
    if (!e && typeof e != "string")
      throw new x("Invalid property path");
    let r = t;
    const o = e.split(".");
    for (const n of o)
      if (r && typeof r == "object" && n in r)
        r = r[n];
      else
        return;
    return r;
  },
  propsSetter: (t, e, r) => {
    if (!t)
      throw new i("Invalid object");
    if (!e || typeof e != "string")
      throw new i("Invalid property path");
    let o = t;
    const n = e.split(".");
    for (let s = 0; s < n.length - 1; s++) {
      const c = n[s];
      if (o && typeof o == "object" && c in o || (o[c] = {}), o = o[c], !(o instanceof Object))
        throw new i(`Invalid object at property '${n.slice(0, s + 1).join(".")}'`);
    }
    return o[n[n.length - 1]] = r, o;
  }
};
function a(t = 36) {
  const e = URL.createObjectURL(new Blob()), r = e.substr(-t);
  return URL.revokeObjectURL(e), r;
}
const S = { uuid: a };
export {
  w as objectUtil,
  j as signUtil,
  S as urlUtil
};
