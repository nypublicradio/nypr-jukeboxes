//copied from new-sounds-web-client
'use strict';
import moment from 'moment';

export default function fixTimestamp(timestamp) {

  if (moment(timestamp).tz() === undefined) {
    return moment.tz(timestamp, "America/New_York").toISOString();
  }
  else {
    return moment(timestamp).toISOString();
  }
}
