import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  return moment(params[0]).format("X") <= moment().format("X");
}

export default helper(helperFunction);
