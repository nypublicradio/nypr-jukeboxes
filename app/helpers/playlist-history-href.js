import { helper } from '@ember/component/helper';
import moment from 'moment';
  
export function playlistHistoryHref(params) {
  let momentDate = moment(params[0],'YYYY-MM-DDThh:mm:ss').add(params[1], 'days').startOf('day');
  return '/playlist-history/' + momentDate.format('YYYY') + '/' + momentDate.format('MM') + '/' + momentDate.format('DD');
}

export default helper(playlistHistoryHref);
