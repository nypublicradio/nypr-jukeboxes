import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function helperFunction(params) {
  return moment(params[0],'YYYY-MM-DDThh:mm:ss').format('h:mm') + ' - ' + 
         moment(params[1],'YYYY-MM-DDThh:mm:ss').format('h:mm A');
}

export default helper(helperFunction);