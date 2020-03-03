import { helper } from '@ember/component/helper';
import moment from 'moment';
import {isYesterday, isToday, isTomorrow} from '../helpers/formatted-picker-date'
  
export function formattedDay(timestamp) {
  let momentDate = moment(timestamp,'YYYY-MM-DDTHH:mm:ss');
  if (isToday(momentDate)) {
    return 'Today';
  } else if (isYesterday(momentDate)) {
    return 'Yesterday';
  } else if (isTomorrow(momentDate)) {
    return 'Tomorrow';
  } else {
    return momentDate.format('dddd');
  }
}

export default helper(formattedDay);