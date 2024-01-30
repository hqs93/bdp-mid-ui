import { Md5 } from 'ts-md5';
const getNoncestr = (): string => {
  let d = new Date().getTime();
  // eslint-disable-next-line func-names
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    // eslint-disable-next-line no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const createObj = (f: FormData) => {
  const obj: any = {}
  for(const key of f.keys()) {
    if(!(f.get(key) instanceof File)) {
      obj[key] = f.get(key)
    }
  }
  return JSON.stringify(obj)
}

// 获取签名参数
const creatSigns = (bodyParams: any): any => {
  const noncestr = getNoncestr();
  const timestamp = (new Date()).getTime();
  const userSecret = window.localStorage.getItem('userSecret') || '';
  const jsonstr = bodyParams ? (typeof bodyParams === 'object' ? bodyParams instanceof FormData ? createObj(bodyParams) : JSON.stringify(bodyParams) : bodyParams) : ''

  // console.log(jsonstr, 'jsonstr')
  const signstr = jsonstr + noncestr + timestamp + userSecret;
  // const signstr = '{"id":28,"classifyId":"71df4fda75c8445a8a871f2612b01e86","name":"代码标准测试数据","code":"test_code","manageDeptId":"company","manageDeptName":"集团公司","managerId":"caiws","managerName":"蔡伟森","approveDeptId":"company","approveDeptName":"集团公司","approverId":"caiws","approverName":"蔡伟森","versionNo":"20230424150645763","enabled":1,"createBy":"DFMOCS_ADMIN","createDate":"2023-03-30 13:35:02","updateBy":"yuanmeng","updateDate":"2023-04-24 15:06:46","codeContents":[{"valueCode":"1","parentValueCode":"shangji1","valueName":"a","remark":"1"},{"valueCode":"2","parentValueCode":"shangji2","valueName":"b","remark":"2"},{"valueCode":"w","valueName":"q","remark":""}],"state":"PUBLISHED","sourceType":"MANUAL","classifyList":["6122d916f7024afc988b3ade87bccd86","71df4fda75c8445a8a871f2612b01e86"]}80b162e5a2bdd1d29cca45de9472bed916837092144517f62c4c881c44b218027c8ae953b5ddf'
  const sign = Md5.hashStr(signstr);
  // console.log('signstr:', signstr)
  // console.log('sign:', sign)
  const o = {
    noncestr,
    timestamp,
    sign
  }
  return o
}

const signUtil =  {getNoncestr, creatSigns}

export default signUtil
