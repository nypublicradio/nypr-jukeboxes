import { helper } from '@ember/component/helper';
import moment from 'moment';
import {isYesterday, isToday} from '../helpers/formatted-picker-date'
  
export function formattedDate(timestamp) {
  let momentDate = moment(timestamp,'YYYY-MM-DDTHH:mm:ss');
  if (isToday(momentDate) || isYesterday(momentDate)) {
    return momentDate.format("dddd, MMMM Do, YYYY");
  } else {
    return momentDate.format("MMMM Do, YYYY");
  }
}

export default helper(formattedDate);