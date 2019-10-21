import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  let momentDate = moment(params[0],'YYYY-MM-DDThh:mm:ss').add(params[1], 'days').startOf('day');
  return !isAfterToday(momentDate);
}

function isAfterToday(momentDate) {
  let today = moment().startOf('day');
  return momentDate.isAfter(today, 'd');
}

export default helper(helperFunction);