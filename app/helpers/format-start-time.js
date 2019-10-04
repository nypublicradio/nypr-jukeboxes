import { helper } from '@ember/component/helper';
  
export function formatStartTime(timestamp) {
  return moment(timestamp,'YYYY-MM-DDThh:mm:ss').format('h:mm A');
}

export default helper(formatStartTime);


