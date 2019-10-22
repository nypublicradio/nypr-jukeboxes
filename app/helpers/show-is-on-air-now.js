import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  let startTime = moment(params[0]);
  let endTime = moment(params[1]);
  let now = moment();

  return startTime.isBefore(now) && endTime.isAfter(now);
}

export default helper(helperFunction);