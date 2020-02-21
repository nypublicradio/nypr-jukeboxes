import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  console.log('today date', params[0]) 
  console.log('what date', params[1]) //1
  let momentDate = moment(params[0],'YYYY-MM-DDTHH:mm:ss').add(params[7], 'days').startOf('day');

  console.log('isaftertoday', isAfterToday(momentDate))
  return true;
  //return !isAfterToday(momentDate);
  //return isAfterToday(momentDate); //doesnt show the next day's link
}

function isAfterToday(momentDate) {
  let today = moment().startOf('day');
  console.log(today)
  
  return momentDate.isAfter(today, 'd');
}

export default helper(helperFunction);