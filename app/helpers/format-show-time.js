import { helper } from '@ember/component/helper';
import moment from 'moment';

export function helperFunction(params) {
  return moment(params[0]).format('h:mm') + ' - ' +
         moment(params[1]).format('h:mm A');
}

export default helper(helperFunction);
