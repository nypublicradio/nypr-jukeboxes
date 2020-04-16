import moment from 'moment';

export default function generateTrackUniqueId(trackAttrs) {
  // This should be obsoleted by this ticket: https://jira.wnyc.org/browse/DSODA-304
  //
  // The point of this is to generate an ID so that we can match up
  // a track coming from woms and a track that comes from publisher
  // Currently woms is using the format of [site_name]_[epoch_start_time]_[mm_uid] for the id
  // We have to fake this for the playlist-history endpoint, as publisher doesn't do this yet

  return `wqxr_${moment(trackAttrs['start-time']).unix()}_${trackAttrs['mm-uid']}`
}
