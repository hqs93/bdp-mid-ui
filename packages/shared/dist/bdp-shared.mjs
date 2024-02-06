class f {
  constructor() {
    this._dataLength = 0, this._bufferLength = 0, this._state = new Int32Array(4), this._buffer = new ArrayBuffer(68), this._buffer8 = new Uint8Array(this._buffer, 0, 68), this._buffer32 = new Uint32Array(this._buffer, 0, 17), this.start();
  }
  static hashStr(i, n = !1) {
    return this.onePassHasher.start().appendStr(i).end(n);
  }
  static hashAsciiStr(i, n = !1) {
    return this.onePassHasher.start().appendAsciiStr(i).end(n);
  }
  static _hex(i) {
    const n = f.hexChars, r = f.hexOut;
    let t, e, s, h;
    for (h = 0; h < 4; h += 1)
      for (e = h * 8, t = i[h], s = 0; s < 8; s += 2)
        r[e + 1 + s] = n.charAt(t & 15), t >>>= 4, r[e + 0 + s] = n.charAt(t & 15), t >>>= 4;
    return r.join("");
  }
  static _md5cycle(i, n) {
    let r = i[0], t = i[1], e = i[2], s = i[3];
    r += (t & e | ~t & s) + n[0] - 680876936 | 0, r = (r << 7 | r >>> 25) + t | 0, s += (r & t | ~r & e) + n[1] - 389564586 | 0, s = (s << 12 | s >>> 20) + r | 0, e += (s & r | ~s & t) + n[2] + 606105819 | 0, e = (e << 17 | e >>> 15) + s | 0, t += (e & s | ~e & r) + n[3] - 1044525330 | 0, t = (t << 22 | t >>> 10) + e | 0, r += (t & e | ~t & s) + n[4] - 176418897 | 0, r = (r << 7 | r >>> 25) + t | 0, s += (r & t | ~r & e) + n[5] + 1200080426 | 0, s = (s << 12 | s >>> 20) + r | 0, e += (s & r | ~s & t) + n[6] - 1473231341 | 0, e = (e << 17 | e >>> 15) + s | 0, t += (e & s | ~e & r) + n[7] - 45705983 | 0, t = (t << 22 | t >>> 10) + e | 0, r += (t & e | ~t & s) + n[8] + 1770035416 | 0, r = (r << 7 | r >>> 25) + t | 0, s += (r & t | ~r & e) + n[9] - 1958414417 | 0, s = (s << 12 | s >>> 20) + r | 0, e += (s & r | ~s & t) + n[10] - 42063 | 0, e = (e << 17 | e >>> 15) + s | 0, t += (e & s | ~e & r) + n[11] - 1990404162 | 0, t = (t << 22 | t >>> 10) + e | 0, r += (t & e | ~t & s) + n[12] + 1804603682 | 0, r = (r << 7 | r >>> 25) + t | 0, s += (r & t | ~r & e) + n[13] - 40341101 | 0, s = (s << 12 | s >>> 20) + r | 0, e += (s & r | ~s & t) + n[14] - 1502002290 | 0, e = (e << 17 | e >>> 15) + s | 0, t += (e & s | ~e & r) + n[15] + 1236535329 | 0, t = (t << 22 | t >>> 10) + e | 0, r += (t & s | e & ~s) + n[1] - 165796510 | 0, r = (r << 5 | r >>> 27) + t | 0, s += (r & e | t & ~e) + n[6] - 1069501632 | 0, s = (s << 9 | s >>> 23) + r | 0, e += (s & t | r & ~t) + n[11] + 643717713 | 0, e = (e << 14 | e >>> 18) + s | 0, t += (e & r | s & ~r) + n[0] - 373897302 | 0, t = (t << 20 | t >>> 12) + e | 0, r += (t & s | e & ~s) + n[5] - 701558691 | 0, r = (r << 5 | r >>> 27) + t | 0, s += (r & e | t & ~e) + n[10] + 38016083 | 0, s = (s << 9 | s >>> 23) + r | 0, e += (s & t | r & ~t) + n[15] - 660478335 | 0, e = (e << 14 | e >>> 18) + s | 0, t += (e & r | s & ~r) + n[4] - 405537848 | 0, t = (t << 20 | t >>> 12) + e | 0, r += (t & s | e & ~s) + n[9] + 568446438 | 0, r = (r << 5 | r >>> 27) + t | 0, s += (r & e | t & ~e) + n[14] - 1019803690 | 0, s = (s << 9 | s >>> 23) + r | 0, e += (s & t | r & ~t) + n[3] - 187363961 | 0, e = (e << 14 | e >>> 18) + s | 0, t += (e & r | s & ~r) + n[8] + 1163531501 | 0, t = (t << 20 | t >>> 12) + e | 0, r += (t & s | e & ~s) + n[13] - 1444681467 | 0, r = (r << 5 | r >>> 27) + t | 0, s += (r & e | t & ~e) + n[2] - 51403784 | 0, s = (s << 9 | s >>> 23) + r | 0, e += (s & t | r & ~t) + n[7] + 1735328473 | 0, e = (e << 14 | e >>> 18) + s | 0, t += (e & r | s & ~r) + n[12] - 1926607734 | 0, t = (t << 20 | t >>> 12) + e | 0, r += (t ^ e ^ s) + n[5] - 378558 | 0, r = (r << 4 | r >>> 28) + t | 0, s += (r ^ t ^ e) + n[8] - 2022574463 | 0, s = (s << 11 | s >>> 21) + r | 0, e += (s ^ r ^ t) + n[11] + 1839030562 | 0, e = (e << 16 | e >>> 16) + s | 0, t += (e ^ s ^ r) + n[14] - 35309556 | 0, t = (t << 23 | t >>> 9) + e | 0, r += (t ^ e ^ s) + n[1] - 1530992060 | 0, r = (r << 4 | r >>> 28) + t | 0, s += (r ^ t ^ e) + n[4] + 1272893353 | 0, s = (s << 11 | s >>> 21) + r | 0, e += (s ^ r ^ t) + n[7] - 155497632 | 0, e = (e << 16 | e >>> 16) + s | 0, t += (e ^ s ^ r) + n[10] - 1094730640 | 0, t = (t << 23 | t >>> 9) + e | 0, r += (t ^ e ^ s) + n[13] + 681279174 | 0, r = (r << 4 | r >>> 28) + t | 0, s += (r ^ t ^ e) + n[0] - 358537222 | 0, s = (s << 11 | s >>> 21) + r | 0, e += (s ^ r ^ t) + n[3] - 722521979 | 0, e = (e << 16 | e >>> 16) + s | 0, t += (e ^ s ^ r) + n[6] + 76029189 | 0, t = (t << 23 | t >>> 9) + e | 0, r += (t ^ e ^ s) + n[9] - 640364487 | 0, r = (r << 4 | r >>> 28) + t | 0, s += (r ^ t ^ e) + n[12] - 421815835 | 0, s = (s << 11 | s >>> 21) + r | 0, e += (s ^ r ^ t) + n[15] + 530742520 | 0, e = (e << 16 | e >>> 16) + s | 0, t += (e ^ s ^ r) + n[2] - 995338651 | 0, t = (t << 23 | t >>> 9) + e | 0, r += (e ^ (t | ~s)) + n[0] - 198630844 | 0, r = (r << 6 | r >>> 26) + t | 0, s += (t ^ (r | ~e)) + n[7] + 1126891415 | 0, s = (s << 10 | s >>> 22) + r | 0, e += (r ^ (s | ~t)) + n[14] - 1416354905 | 0, e = (e << 15 | e >>> 17) + s | 0, t += (s ^ (e | ~r)) + n[5] - 57434055 | 0, t = (t << 21 | t >>> 11) + e | 0, r += (e ^ (t | ~s)) + n[12] + 1700485571 | 0, r = (r << 6 | r >>> 26) + t | 0, s += (t ^ (r | ~e)) + n[3] - 1894986606 | 0, s = (s << 10 | s >>> 22) + r | 0, e += (r ^ (s | ~t)) + n[10] - 1051523 | 0, e = (e << 15 | e >>> 17) + s | 0, t += (s ^ (e | ~r)) + n[1] - 2054922799 | 0, t = (t << 21 | t >>> 11) + e | 0, r += (e ^ (t | ~s)) + n[8] + 1873313359 | 0, r = (r << 6 | r >>> 26) + t | 0, s += (t ^ (r | ~e)) + n[15] - 30611744 | 0, s = (s << 10 | s >>> 22) + r | 0, e += (r ^ (s | ~t)) + n[6] - 1560198380 | 0, e = (e << 15 | e >>> 17) + s | 0, t += (s ^ (e | ~r)) + n[13] + 1309151649 | 0, t = (t << 21 | t >>> 11) + e | 0, r += (e ^ (t | ~s)) + n[4] - 145523070 | 0, r = (r << 6 | r >>> 26) + t | 0, s += (t ^ (r | ~e)) + n[11] - 1120210379 | 0, s = (s << 10 | s >>> 22) + r | 0, e += (r ^ (s | ~t)) + n[2] + 718787259 | 0, e = (e << 15 | e >>> 17) + s | 0, t += (s ^ (e | ~r)) + n[9] - 343485551 | 0, t = (t << 21 | t >>> 11) + e | 0, i[0] = r + i[0] | 0, i[1] = t + i[1] | 0, i[2] = e + i[2] | 0, i[3] = s + i[3] | 0;
  }
  start() {
    return this._dataLength = 0, this._bufferLength = 0, this._state.set(f.stateIdentity), this;
  }
  appendStr(i) {
    const n = this._buffer8, r = this._buffer32;
    let t = this._bufferLength, e, s;
    for (s = 0; s < i.length; s += 1) {
      if (e = i.charCodeAt(s), e < 128)
        n[t++] = e;
      else if (e < 2048)
        n[t++] = (e >>> 6) + 192, n[t++] = e & 63 | 128;
      else if (e < 55296 || e > 56319)
        n[t++] = (e >>> 12) + 224, n[t++] = e >>> 6 & 63 | 128, n[t++] = e & 63 | 128;
      else {
        if (e = (e - 55296) * 1024 + (i.charCodeAt(++s) - 56320) + 65536, e > 1114111)
          throw new Error("Unicode standard supports code points up to U+10FFFF");
        n[t++] = (e >>> 18) + 240, n[t++] = e >>> 12 & 63 | 128, n[t++] = e >>> 6 & 63 | 128, n[t++] = e & 63 | 128;
      }
      t >= 64 && (this._dataLength += 64, f._md5cycle(this._state, r), t -= 64, r[0] = r[16]);
    }
    return this._bufferLength = t, this;
  }
  appendAsciiStr(i) {
    const n = this._buffer8, r = this._buffer32;
    let t = this._bufferLength, e, s = 0;
    for (; ; ) {
      for (e = Math.min(i.length - s, 64 - t); e--; )
        n[t++] = i.charCodeAt(s++);
      if (t < 64)
        break;
      this._dataLength += 64, f._md5cycle(this._state, r), t = 0;
    }
    return this._bufferLength = t, this;
  }
  appendByteArray(i) {
    const n = this._buffer8, r = this._buffer32;
    let t = this._bufferLength, e, s = 0;
    for (; ; ) {
      for (e = Math.min(i.length - s, 64 - t); e--; )
        n[t++] = i[s++];
      if (t < 64)
        break;
      this._dataLength += 64, f._md5cycle(this._state, r), t = 0;
    }
    return this._bufferLength = t, this;
  }
  getState() {
    const i = this._state;
    return {
      buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
      buflen: this._bufferLength,
      length: this._dataLength,
      state: [i[0], i[1], i[2], i[3]]
    };
  }
  setState(i) {
    const n = i.buffer, r = i.state, t = this._state;
    let e;
    for (this._dataLength = i.length, this._bufferLength = i.buflen, t[0] = r[0], t[1] = r[1], t[2] = r[2], t[3] = r[3], e = 0; e < n.length; e += 1)
      this._buffer8[e] = n.charCodeAt(e);
  }
  end(i = !1) {
    const n = this._bufferLength, r = this._buffer8, t = this._buffer32, e = (n >> 2) + 1;
    this._dataLength += n;
    const s = this._dataLength * 8;
    if (r[n] = 128, r[n + 1] = r[n + 2] = r[n + 3] = 0, t.set(f.buffer32Identity.subarray(e), e), n > 55 && (f._md5cycle(this._state, t), t.set(f.buffer32Identity)), s <= 4294967295)
      t[14] = s;
    else {
      const h = s.toString(16).match(/(.*?)(.{0,8})$/);
      if (h === null)
        return;
      const l = parseInt(h[2], 16), b = parseInt(h[1], 16) || 0;
      t[14] = l, t[15] = b;
    }
    return f._md5cycle(this._state, t), i ? this._state : f._hex(this._state);
  }
}
f.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
f.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
f.hexChars = "0123456789abcdef";
f.hexOut = [];
f.onePassHasher = new f();
if (f.hashStr("hello") !== "5d41402abc4b2a76b9719d911017c592")
  throw new Error("Md5 self test failed.");
const u = () => {
  let o = new Date().getTime();
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g, function(i) {
    const n = (o + Math.random() * 16) % 16 | 0;
    return o = Math.floor(o / 16), (i === "x" ? n : n & 3 | 8).toString(16);
  });
}, x = (o) => {
  const i = {};
  for (const n of o.keys())
    o.get(n) instanceof File || (i[n] = o.get(n));
  return JSON.stringify(i);
}, g = (o) => {
  const i = u(), n = new Date().getTime(), r = window.localStorage.getItem("userSecret") || "", e = (o ? typeof o == "object" ? o instanceof FormData ? x(o) : JSON.stringify(o) : o : "") + i + n + r, s = f.hashStr(e);
  return {
    noncestr: i,
    timestamp: n,
    sign: s
  };
}, d = { getNoncestr: u, creatSigns: g };
class c extends Error {
  constructor(i) {
    super(i), this.name = "PropsGetterError";
  }
}
class a extends Error {
  constructor(i) {
    super(i), this.name = "PropsSetterError";
  }
}
const _ = {
  propsGetter: (o, i) => {
    if (!o)
      throw new c("Invalid object");
    if (!i && typeof i != "string")
      throw new c("Invalid property path");
    let n = o;
    const r = i.split(".");
    for (const t of r)
      if (n && typeof n == "object" && t in n)
        n = n[t];
      else
        return;
    return n;
  },
  propsSetter: (o, i, n) => {
    if (!o)
      throw new a("Invalid object");
    if (!i || typeof i != "string")
      throw new a("Invalid property path");
    let r = o;
    const t = i.split(".");
    for (let e = 0; e < t.length - 1; e++) {
      const s = t[e];
      if (r && typeof r == "object" && s in r || (r[s] = {}), r = r[s], !(r instanceof Object))
        throw new a(`Invalid object at property '${t.slice(0, e + 1).join(".")}'`);
    }
    return r[t[t.length - 1]] = n, r;
  }
};
function p(o = 36) {
  const i = URL.createObjectURL(new Blob()), n = i.substr(-o);
  return URL.revokeObjectURL(i), n;
}
const F = { uuid: p };
export {
  _ as objectUtil,
  d as signUtil,
  F as urlUtil
};
