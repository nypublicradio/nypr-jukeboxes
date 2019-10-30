import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function formattedDay(timestamp) {
  let momentDate = moment(timestamp,'YYYY-MM-DDTHH:mm:ss');
  if (isToday(momentDate)) {
    return 'Today';
  } else if (isYesterday(momentDate)) {
    return 'Yesterday';
  } else {
    return momentDate.format('dddd');
  }
}

function isToday(momentDate) {
  let today = moment().startOf('day');
  return momentDate.isSame(today, 'd');
}

function isYesterday(momentDate) {
  let yesterday = moment().subtract(1, 'days').startOf('day');
  return momentDate.isSame(yesterday, 'd');
}

export default helper(formattedDay);
