import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function formattedPickerDate(params) {
  let momentDate = moment(params[0],'YYYY-MM-DDTHH:mm:ss').add(params[1], 'days').startOf('day');
  if (isToday(momentDate)) {
    return 'TODAY';
  } else if (isYesterday(momentDate)) {
    return 'YESTERDAY';
  } else {
    return momentDate.format("dddd, MMMM Do, YYYY");
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

export default helper(formattedPickerDate);