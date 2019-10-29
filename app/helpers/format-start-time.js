import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function formatStartTime(timestamp) {
  let momentStartTime = moment(timestamp,'YYYY-MM-DDTHH:mm:ss');
  if (momentStartTime.isValid()) {
    return momentStartTime.format('h:mm A');
  } else {
    momentStartTime = moment(timestamp,'hh:mm A');
    if (momentStartTime.isValid()) {
      return momentStartTime.format('h:mm A');
    }
  }
  return timestamp;
}

export default helper(formatStartTime);


