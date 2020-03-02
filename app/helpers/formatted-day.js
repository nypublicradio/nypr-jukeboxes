import { helper } from '@ember/component/helper';
import moment from 'moment';
import {isYesterday, isTomorrow} from '../helpers/formatted-picker-date'
  
export function formattedDay(timestamp) {
  let momentDate = moment(timestamp,'YYYY-MM-DDTHH:mm:ss');
  if (isToday(momentDate)) {
    return 'Today';
  } else if (isYesterday(momentDate)) {
    return 'Yesterday';
  }
  else if (isTomorrow(momentDate)) {
    return 'Tomorrow';
  }
  else {
    return momentDate.format('dddd');
  }
}

function isToday(momentDate) {
  let today = moment().startOf('day');
  return momentDate.isSame(today, 'd');
}

// function isYesterday(momentDate) {
//   let yesterday = moment().subtract(1, 'days').startOf('day');
//   return momentDate.isSame(yesterday, 'd');
// }

// function isTomorrow(momentDate) {
//   let tomorrow = moment().add(1, 'days').startOf('day');
//   return momentDate.isSame(tomorrow, 'tommo');
// }

export default helper(formattedDay);