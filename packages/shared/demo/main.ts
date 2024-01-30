import * as utils from "../index";

console.log('urlUtil', utils.urlUtil.uuid());

console.log('signUtil', utils.signUtil.creatSigns({ name: "utils" }));

const obj = {
  props: {
    props1: {
      props2: 'utils'
    }
  }
}
console.log('objectUtil', utils.objectUtil.propsGetter(obj, 'props.props1.props2'));

console.log('utils', utils);
