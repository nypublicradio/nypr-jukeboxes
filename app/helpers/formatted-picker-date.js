import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function formattedPickerDate(params) {
  let momentDate = moment(params[0],'YYYY-MM-DDTHH:mm:ss').add(params[1], 'days').startOf('day');
  if (isToday(momentDate)) {
    return 'TODAY';
  } else if (isYesterday(momentDate)) {
    return 'YESTERDAY';
  } else if (isLessThanOneWeekAgo(momentDate)) {
    return momentDate.format("dddd");
  } else if (isLessThanAYearAGo(momentDate)) {
    return momentDate.format("dddd, MMM Do");
  } else {
    return momentDate.format("dddd, MMM Do, YYYY");
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

function isLessThanOneWeekAgo(momentDate) {
  let aWeekAgo = moment().subtract(7, 'days').startOf('day');
  return momentDate.isAfter(aWeekAgo, 'd');
}

function isLessThanAYearAGo(momentDate) {
  let aYearAgo = moment().subtract(1, 'years').startOf('day');
  return momentDate.isAfter(aYearAgo, 'd');
}

export default helper(formattedPickerDate);