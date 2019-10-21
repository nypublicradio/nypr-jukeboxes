import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function formattedDate(timestamp) {
  let momentDate = moment(timestamp,'YYYY-MM-DDThh:mm:ss');
  if (isToday(momentDate) || isYesterday(momentDate)) {
  	return momentDate.format("dddd, MMMM Do, YYYY");
  } else {
  	return momentDate.format("MMMM Do, YYYY");
  }
}

// todo: this code is duplicated in formatted-day
function isToday(momentDate) {
  let today = moment().startOf('day');
  return momentDate.isSame(today, 'd');
}

function isYesterday(momentDate) {
	let yesterday = moment().subtract(1, 'days').startOf('day');
    return momentDate.isSame(yesterday, 'd');
}

export default helper(formattedDate);