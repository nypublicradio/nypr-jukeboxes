import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  let startTime = moment(params[0], 'YYYY-MM-DDTHH:mm:ss');
  let endTime = moment(params[1], 'YYYY-MM-DDTHH:mm:ss');
  let now = moment();

  return startTime.isBefore(now) && endTime.isAfter(now);
}

export default helper(helperFunction);